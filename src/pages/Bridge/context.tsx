import { createContext, useState } from 'react';

// From movr response
type Chain = {
  chainId: number;
  name: string;
  isL1: boolean;
  isTestnet: boolean;
  sendingEnabled: boolean;
  icon: string;
  receivingEnabled: boolean;
  currency: {
    address: string;
    icon?: string;
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcs: string[];
  explorers: string[];
};

interface BridgeContext {
  fromChain: Chain | null;
  setFromChain: React.Dispatch<React.SetStateAction<Chain>>;
  toChain: Chain | null;
  setToChain: React.Dispatch<React.SetStateAction<Chain>>;
}

interface ContextProvider {
  children: React.ReactNode;
}

export const BridgeContext = createContext<BridgeContext>({} as BridgeContext);
export const BridgeContextProvider = ({ children }: ContextProvider): React.ReactElement => {
  const [fromChain, setFromChain] = useState<Chain | null>(null);
  const [toChain, setToChain] = useState<Chain | null>(null);

  return (
    <BridgeContext.Provider value={{ fromChain, setFromChain, toChain, setToChain }}>
      {children}
    </BridgeContext.Provider>
  );
};
