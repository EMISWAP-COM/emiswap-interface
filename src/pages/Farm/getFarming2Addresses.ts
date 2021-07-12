const addressesByNetworkId = {
  1: [
  ],
  42: [
    '0x7b07EF156DFD4Bf7c1356F3CFf1fbA29050173AF',
    '0x9E716d6200F940392a7cd8993EB61006E6C69eC8',
  ]
}



const getFarming2Addresses = () => {
  // @ts-ignore
  const chainId = window.env.REACT_APP_CHAIN_ID;

  return addressesByNetworkId[chainId] || [];
}

export default getFarming2Addresses;
