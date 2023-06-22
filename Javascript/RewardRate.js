import { HomeContext } from "@/contexts/stakingContext";
import { createStakingInstance } from "@/ethereum/createStaking";
import useInputState from "@/hooks/useInputState";
import onNotify from "@/utils/onNotify";
import React, { useContext } from "react";

function RewardRate({ currRewardRate, setCurrRewardRate }) {
  const [rewardRate, updateRewardRate, resetRewardRate] = useInputState("");

  const { isDisabled, setIsDisabled } = useContext(HomeContext);

  // @ts-ignore
  const rewardRateHandler = async () => {
    try {
      setIsDisabled(true);
      //type to input tag hi number dalne dega
      if (rewardRate <= 0) {
        console.log("Enter valid input");
        resetRewardRate();
        throw new Error("Invalid Input");
      }

      const stakingContract = await createStakingInstance();
      const tx = await stakingContract.setRewardRate(rewardRate);
      await tx.wait(1);
      setCurrRewardRate(rewardRate);
      onNotify(true, `Reward Rate Changed to ${rewardRate} tokens per 1000 tokens staked`);
    } catch (err) {
      onNotify(false, "Transaction Failed 😞");
      console.error(err);
    }
    resetRewardRate();
    setIsDisabled(false);
  };
  return (
    <div className="flex flex-col justify-content items-center">
      <div className="mx-5 font-bold"> Current Reward Rate : {currRewardRate} </div>
      <div className="text-sm text-gray-500">Reward Rate is no. of reward tokens per 1000 tokens staked for each reward period</div>
      <div className="flex flex-row justify-content items-center">
        <form className="bg-white p-6 rounded-lg  text-center ">
          <label htmlFor="rewardRate" className="block text-gray-700 font-bold mb-2"></label>
          <input
            id="rewardRate"
            type="number"
            name="rewardRate"
            placeholder="Reward Rate"
            value={rewardRate}
            className="border border-gray-300 py-2 px-2 rounded-md w-full"
            onChange={updateRewardRate}
          />
        </form>

        <button
          className={
            !isDisabled
              ? "bg-teal-500 hover:bg-yellow-400 rounded-xl px-1 py-1 ml-1 transition duration-300 ease-in-out shadow-lg text-lg"
              : "px-1 py-1 ml-1 bg-slate-600 rounded-xl shadow-lg text-lg text-slate-400 "
          }
          disabled={isDisabled}
          onClick={rewardRateHandler}
        >
          Change Reward Rate
        </button>
      </div>
    </div>
  );
}

export default RewardRate;
