import { createStakingInstance } from "@/ethereum/createStaking";

import { useEffect, useState } from "react";
import PauseWithdrawal from "./owner-interactions/PauseWithdrawal";
import RewardPeriod from "./owner-interactions/RewardPeriod";
import RewardRate from "./owner-interactions/RewardRate";
import React from "react";

function OwnerInteraction() {
  const [currRewardRate, setCurrRewardRate] = useState("");

  const [currRewardPeriod, setCurrRewardPeriod] = useState("");

  const [pauseWithdrawal, setPauseWithdrawal] = useState(false);

  useEffect(() => {
    const setValue = async () => {
      const stakingContract = await createStakingInstance();
      const rewardRateFromCall = await stakingContract.getRewardRate();
      const rewardPeriodFromCall = await stakingContract.getRewardPeriod();
      const pauseWithdrawalFromCall = await stakingContract.getPauseWithdrawalOfBalanceAndReward(); //bool return
      setPauseWithdrawal(pauseWithdrawalFromCall);
      setCurrRewardRate(rewardRateFromCall.toString());
      setCurrRewardPeriod(rewardPeriodFromCall.toString());
    };
    setValue();
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <RewardRate currRewardRate={currRewardRate} setCurrRewardRate={setCurrRewardRate} />
      <hr />
      <RewardPeriod currRewardPeriod={currRewardPeriod} setCurrRewardPeriod={setCurrRewardPeriod} />
      {/** */} <PauseWithdrawal pauseWithdrawal={pauseWithdrawal} setPauseWithdrawal={setPauseWithdrawal} />
    </div>
  );
}

export default OwnerInteraction;
