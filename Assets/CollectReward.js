import { ContractDataContext } from "@/contexts/contractDataContext";
import { HomeContext } from "@/contexts/stakingContext";
import { createStakingInstance } from "@/ethereum/createStaking";
import currentConnectedAccount from "@/ethereum/currentConnectedAccount";
import onCollectReward from "@/utils/onCollectReward";
import onNotify from "@/utils/onNotify";

import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";

function CollectReward() {
  const [rewardTokens, setRewardTokens] = useState("0");
  const { isDisabled, setIsDisabled } = useContext(HomeContext);
  const { stakedTokens, approvedTokens } = useContext(ContractDataContext);

  useEffect(() => {
    const setValue = async () => {
      try {
        const stakingContract = await createStakingInstance();
        const owner = await currentConnectedAccount();
        const rewardTokensFromCall = await stakingContract.getRewardToBeClaimed(owner);

        setRewardTokens(ethers.utils.formatEther(rewardTokensFromCall).toString());
      } catch (err) {
        console.error(err);
      }
    };
    setValue();
  }, [stakedTokens, approvedTokens]);

  const collectRewardHandler = async () => {
    try {
      setIsDisabled(true);
      await onCollectReward(setRewardTokens);
      onNotify(true, "Tokens Collected");
    } catch (err) {
      onNotify(false, "Transaction Failed");
      console.error(err);
    }
    setIsDisabled(false);
  };
  return (
    <div className="flex flex-row items-center justify-center">
      <div className=" text-lg  text-black">{`Your total reward : ${rewardTokens} tokens`}</div>
      <button
        className={
          !isDisabled
            ? "bg-teal-500 hover:bg-yellow-400 rounded-xl px-1 py-1 ml-5 transition duration-300 ease-in-out shadow-lg text-lg"
            : "px-1 py-1 ml-1 bg-slate-600 rounded-xl shadow-lg text-lg text-slate-400 "
        }
        disabled={isDisabled}
        onClick={collectRewardHandler}
      >
        Collect Reward
      </button>
    </div>
  );
}

export default CollectReward;
