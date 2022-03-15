import ERC20_INTERFACE from "../../constants/abis/erc20"

const test = () => {
  const addresses = [];
  const method = 'decimals';
  const interface = ERC20_INTERFACE;

  const fragment = contractInterface.getFunction(methodName);

  contractInterface.encodeFunctionData(fragment, callInput)
}

export default test;