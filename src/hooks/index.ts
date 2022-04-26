import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React, useWeb3React as useWeb3ReactCore } from '@web3-react/core';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { injected } from '../connectors';
import { INetworkItem, NetworkContextName, networksItems } from '../constants';
import { ChainId } from '@uniswap/sdk';
import { toHex } from 'web3-utils';
import { FortmaticConnector } from '../connectors/Fortmatic';
import { PortisConnector } from '@web3-react/portis-connector';
import { useIsMetaMask } from './Coins';
import { NetworkConnector } from '../connectors/NetworkConnector';

export { default as useToggle } from './useToggle';
export { default as useMediaQuery } from './useMediaQuery';

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & {
  chainId?: ChainId;
} {
  const context = useWeb3ReactCore<Web3Provider>();
  const contextNetwork = useWeb3ReactCore<Web3Provider>(NetworkContextName);
  return context.active ? context : contextNetwork;
}

export function usePolygonWeb3React(): Web3ReactContextInterface<Web3Provider> & {
  chainId?: ChainId;
} {
  return useWeb3ReactCore<Web3Provider>('polygon');
}

export function useAsync(asyncFn: any, onSuccess: any) {
  useEffect(() => {
    let isMounted = true;
    asyncFn().then((data: any) => {
      if (isMounted) {
        onSuccess(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [asyncFn, onSuccess]);
}

export function usePolygon() {
  const { activate, active } = useWeb3ReactCore('polygon');
  useEffect(() => {
    if (!active) {
      const VALUE_TO_FIND = process.env.NODE_ENV === 'development' ? 'mumbai' : 'polygon';
      const polygon = networksItems.find(item => item.value.toLowerCase() === VALUE_TO_FIND);
      if (!polygon) return;
      const key = Number(polygon.chainId);
      const value = String(polygon.rpcUrls[0]);
      const network = new NetworkConnector({ urls: { [key]: value } });
      activate(network).catch(() => {
        console.error('Failed to active polygon connection');
      });
    }
  }, [activate, active]);
}

export function useEagerConnect() {
  const { activate, active } = useWeb3ReactCore(); // specifically using useWeb3ReactCore because of what this hook does
  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then(isAuthorized => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        if (isMobile && window.ethereum) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          setTried(true);
        }
      }
    });
  }, [activate]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true);
    }
  }, [active]);

  return tried;
}

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3ReactCore(); // specifically using useWeb3React because of what this hook does

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = () => {
        // eat errors
        activate(injected, undefined, true).catch(error => {
          console.error('Failed to activate after chain changed', error);
        });
      };

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          // eat errors
          activate(injected, undefined, true).catch(error => {
            console.error('Failed to activate after accounts changed', error);
          });
        }
      };

      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
    return;
  }, [active, error, suppress, activate]);
}

export function useSwitchNetwork() {
  const { connector } = useActiveWeb3React();
  const { deactivate } = useWeb3React();

  const isMetaMask = useIsMetaMask();

  const switchNetwork = async (item: INetworkItem) => {
    const { ethereum } = window as any;

    try {
      ethereum.removeAllListeners(['networkChanged']);

      const result = await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: toHex(item.chainId) }],
      });
      console.log(result);
      console.log('switch 1');
    } catch (switchError) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: toHex(item.chainId),
              chainName: item.name,
              rpcUrls: item.rpcUrls,
              nativeCurrency: {
                name: item.currencySymbol,
                symbol: item.currencySymbol,
                decimals: 18,
              },
            },
          ],
        });
        console.log('switch 2');
      } catch (addError) {
        console.log(addError);
      }
    } finally {
      await providerLogout();
    }
  };

  const providerLogout = async () => {
    if (isMetaMask) {
      return;
    }

    if (!connector) {
      deactivate();
      return;
    }

    const provider = await connector.getProvider();

    if (connector instanceof FortmaticConnector && connector?.fortmatic) {
      connector.fortmatic?.user.logout();
      deactivate();
    } else if (connector instanceof PortisConnector && connector?.portis) {
      connector.portis.logout();
      deactivate();
    } else if (provider?.close) {
      provider.close();
    } else {
      deactivate();
    }
  };

  return { switchNetwork, providerLogout };
}
