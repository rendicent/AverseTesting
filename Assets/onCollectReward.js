import { createStakingInstance } from "@/ethereum/createStaking";

const onCollectReward = async (setRewardTokens) => {
  const stakingContract = await createStakingInstance();

  const tx = await stakingContract.claimRewards();
  await tx.wait(1);

  console.log("Reward Collected");
  setRewardTokens(0);
};

export default onCollectReward;
