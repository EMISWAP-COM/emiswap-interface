const coinNamesMap = {
  '0x501a4F720A911e2898228aCb4D6CB6D76EcE2Ec8': {
    name: 'LP USDC-FLEX V2',
    symbol: 'USDCFLEXV2'
  },
  '0x24e7eB9874922726A8d8f277EF1c3Ad4a3Ab4eD1': {
    name: 'ESW-D',
    symbol: 'ESW-D'
  },
  '0xd9ca818d8db735fde245afaf55821ed7fa582d6c': {
    name: 'ESW V2',
    symbol: 'ESW V2'
  },

}

// Use to override names from defaultCoins.ts only
const getFarmingCoinNameAndSymbol = (farmContractAddress: string): {name: string, symbol: string} => {
  return coinNamesMap[farmContractAddress] || {};
}

export default getFarmingCoinNameAndSymbol;
