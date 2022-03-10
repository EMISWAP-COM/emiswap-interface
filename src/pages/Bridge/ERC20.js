import ethers from 'ethers';
import ERC20Abi from './ERC20abi';

class ERC20 {
  constructor(address, signer) {
    this.symbol = () => {
      return this.UnderlyingContract.symbol();
    };
    this.getBalance = account => {
      return this.UnderlyingContract.balanceOf(account);
    };
    this.getAllowance = (account, contractAddress) => {
      return this.UnderlyingContract.allowance(account, contractAddress);
    };
    this.getTotalSupply = () => {
      return this.UnderlyingContract.totalSupply();
    };
    this.approve = (amount, contractAddress) => {
      return this.UnderlyingContract.connect(this.signer).approve(contractAddress, amount);
    };
    this.address = address;
    this.signer = signer;
    this.UnderlyingContract = new ethers.Contract(this.address, ERC20Abi, signer);
  }
}
export default ERC20;
