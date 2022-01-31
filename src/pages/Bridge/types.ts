export interface Chain {
  chainId: number;
  name: string;
  isL1: boolean;
  isTestnet: boolean;
  sendingEnabled: boolean;
  icon: string;
  receivingEnabled: boolean;
  currency: { address: string; name: string; symbol: string; decimals: number };
  rpcs: string[];
  explorers: string[];
}

export interface Token {
  name: string;
  address: string;
  chainId: number;
  decimals: number;
  symbol: string;
  icon: string;
}

export interface Token {
  name: string;
  address: string;
  chainId: number;
  decimals: number;
  symbol: string;
  icon: string;
}

export interface Quote {
  fromAsset: Token;
  fromChainId: Chain['chainId'];
  toAsset: Token;
  toChainId: Chain['chainId'];
  routes: {
    allowanceTarget: string;
    isApprovalRequired: boolean;
    routePath: string;
    middlewareRoute: {
      middlewareId: number;
      middlewareName: string;
      middlewareInfo: {
        displayName: string;
        icon: string;
      };
      fromAsset: Token;
      toAsset: Token;
      inputAmount: string;
      outputAmount: string;
    };
    bridgeRoute: {
      bridgeName: string;
      bridgeId: number;
      bridgeInfo: {
        serviceTime: number;
        displayName: string;
        icon: string;
      };
      fromAsset: Token;
      fromChainId: Chain['chainId'];
      toAsset: Token;
      toChainId: Chain['chainId'];
      inputAmount: string;
      outputAmount: string;
    };

    fees: {
      gasLimit: { amount: string; assetAddress: string; chainId: number }[];
      middlewareFee: { amount: string; assetAddress: string };
      bridgeFee: { amount: string; assetAddress: string };
    };
  }[];
  amount: string;
}
