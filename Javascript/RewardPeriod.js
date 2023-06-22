import { HomeContext } from "@/contexts/stakingContext";
import { createStakingInstance } from "@/ethereum/createStaking";
import useInputState from "@/hooks/useInputState";
import onNotify from "@/utils/onNotify";
import React, { useContext } from "react";

function RewardPeriod({ currRewardPeriod, setCurrRewardPeriod }) {
  const [rewardPeriod, updateRewardPeriod, resetRewardPeriod] = useInputState("");
  const { isDisabled, setIsDisabled } = useContext(HomeContext);

  // @ts-ignore
  const rewardPeriodHandler = async () => {
    try {
      setIsDisabled(true);

      if (rewardPeriod <= 0) {
        console.log("Enter valid input");
        resetRewardPeriod();
        throw new Error("Invalid Input");
      }

      const stakingContract = await createStakingInstance();
      const tx = await stakingContract.setRewardPeriod(rewardPeriod);

      await tx.wait(1);
      setCurrRewardPeriod(rewardPeriod);
      onNotify(true, `Reward Period Changed to ${rewardPeriod} seconds to update reward`);
    } catch (err) {
      console.error(err);

      onNotify(false, `Transaction Failed `);
    }
    resetRewardPeriod();
    setIsDisabled(false);
  };
  return (
    <div className="flex flex-col justify-content items-center">
      <div className="mx-5 font-bold"> Current Reward Period : {currRewardPeriod} seconds</div>
      <div className="text-sm text-gray-500">Reward Period is time in seconds in which you will get reward after each period</div>
      <div className="flex flex-row justify-content items-center">
        <form className="bg-white p-6 rounded-lg  text-center ">
          <label htmlFor="rewardPeriod" className="block text-gray-700 font-bold mb-2"></label>
          <input
            id="rewardPeriod"
            type="number"
            name="rewardPeriod"
            placeholder="Reward period"
            value={rewardPeriod}
            className="border border-gray-300 py-2 px-2 rounded-md w-full"
            onChange={updateRewardPeriod}
          />
        </form>

        <button
          className={
            !isDisabled
              ? "bg-teal-500 hover:bg-yellow-400 rounded-xl px-1 py-1 ml-1 transition duration-300 ease-in-out shadow-lg text-lg"
              : "px-1 py-1 ml-1 bg-slate-600 rounded-xl shadow-lg text-lg text-slate-400 "
          }
          disabled={isDisabled}
          onClick={rewardPeriodHandler}
        >
          Change Reward Period
        </button>
      </div>
    </div>
  );
}

export default RewardPeriod;
