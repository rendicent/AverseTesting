import { createStakingInstance } from "@/ethereum/createStaking";
import currentConnectedAccount from "@/ethereum/currentConnectedAccount";
import { ethers } from "ethers";
const onStake = async (amount, setStakedTokens) => {
  const stakingContract = await createStakingInstance();
  const owner = await currentConnectedAccount();

  const tx = await stakingContract.stake(ethers.utils.parseEther(amount));
  await tx.wait(1);
  const stakedTokensFromCall = await stakingContract.getStakedBalanceOfUser(owner);
  setStakedTokens(ethers.utils.formatEther(stakedTokensFromCall).toString());
};
export default onStake;
