import { createStakingInstance } from "@/ethereum/createStaking";
import currentConnectedAccount from "@/ethereum/currentConnectedAccount";
import { ethers } from "ethers";

const onWithdraw = async (amount, setStakedTokens) => {
  const stakingContract = await createStakingInstance();
  const owner = await currentConnectedAccount();
  const tx = await stakingContract.withdraw(ethers.utils.parseEther(amount));
  await tx.wait(1);

  console.log("Token withdrawal");
  const updatedBalanceOfUser = await stakingContract.getStakedBalanceOfUser(owner);
  setStakedTokens(ethers.utils.formatEther(updatedBalanceOfUser).toString());
};
export default onWithdraw;
