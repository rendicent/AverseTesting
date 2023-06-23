import { abiERC20, erc20ContractAddresses } from "@/constants";
import { ethers } from "ethers";
const onFund = async (amount, spender, setSpenderBalance) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { chainId } = await provider.getNetwork();

  const contractAddress = erc20ContractAddresses[chainId][erc20ContractAddresses[chainId].length - 1];
  const signer = provider.getSigner();
  const erc20Contract = new ethers.Contract(contractAddress, abiERC20, signer);

  const tx = await erc20Contract.transfer(spender, ethers.utils.parseEther(amount));
  await tx.wait(1);

  const spenderBalance = await erc20Contract.balanceOf(spender);
  setSpenderBalance(ethers.utils.formatEther(spenderBalance).toString());
};
export default onFund;
