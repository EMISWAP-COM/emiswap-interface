import { SUPPORTED_WALLETS } from '../../constants'
import { injected } from '../../connectors'

export function formatConnectorName(connectorName) {
  const { ethereum } = window;
  const isMetaMask = !!(ethereum && ethereum.isMetaMask);
  const name = Object.keys(SUPPORTED_WALLETS)
    .filter(
      k =>
        SUPPORTED_WALLETS[k].connector === connectorName &&
        (connectorName !== injected || isMetaMask === (k === 'METAMASK')),
    )
    .map(k => SUPPORTED_WALLETS[k].name)[0];
  return name
}
