const coinNamesMap = {
  '0x501a4F720A911e2898228aCb4D6CB6D76EcE2Ec8': {
    name: 'LP USDC-FLEX V2',
    symbol: 'USDCFLEXV2'
  },
}

// Use to override names from defaultCoins.ts only
const getFarmingCoinNameAndSymbol = (farmContractAddress: string): {name: string, symbol: string} => {
  return coinNamesMap[farmContractAddress] || {};
}

export default getFarmingCoinNameAndSymbol;
