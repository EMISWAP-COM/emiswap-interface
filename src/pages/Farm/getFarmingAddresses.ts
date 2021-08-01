const addressesByNetworkId = {
  1: [
    '0x9e6b253c45532ca61489100baded4f5bcd226042',
    '0x673f7a16B2d696A987383921292e8f46DA715952',
    '0x0607C72267a160Edcf5151cd38d832C524817b6c',
    '0xb7282ff5e0abe11446a327f799180d5c9a444fc7',
    '0xeccd43cab1ef8619e11cdc04f82e0db2b90a7dbe',
    '0x18caa4b61f116cf98ba1ebb12b53003fecc5767d',
    '0x127ec35743e0c8a2a233d0b9899200b7ef58eaf5',
    '0x501a4F720A911e2898228aCb4D6CB6D76EcE2Ec8',
  ],
  42: [
    '0x25356d68645692d1D456314728Cab21c283B1f47',
    '0x592eFD7A7d85b1D592c76d9a80D53f6a5db41c76',
    '0x6474fb64340837E1CCCbB1Bb4E0086081f3FdeB9',
    '0x14C22660fD7CB44843bC3158fce58951AcABb7B1',
    '0x24e7eB9874922726A8d8f277EF1c3Ad4a3Ab4eD1',
  ]
}



const getFarmingAddresses = () => {
  // @ts-ignore
  const chainId = window.env.REACT_APP_CHAIN_ID;

  return addressesByNetworkId[chainId] || [];
}

export default getFarmingAddresses;
