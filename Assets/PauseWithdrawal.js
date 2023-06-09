import { HomeContext } from "@/contexts/stakingContext";
import { createStakingInstance } from "@/ethereum/createStaking";

import onNotify from "@/utils/onNotify";
import React, { useContext } from "react";

function PauseWithdrawal({ pauseWithdrawal, setPauseWithdrawal }) {
  const { isDisabled, setIsDisabled } = useContext(HomeContext);

  // @ts-ignore
  const pauseWithdrawalHandler = async () => {
    try {
      setIsDisabled(true);

      const stakingContract = await createStakingInstance();
      const tx = await stakingContract.setPauseWithdrawalOfBalanceAndReward(!pauseWithdrawal);
      await tx.wait(1);
      setPauseWithdrawal(!pauseWithdrawal);
      onNotify(true, `Withdrawal ${!pauseWithdrawal ? "Paused" : "Activated"}`);
    } catch (err) {
      onNotify(false, "Transaction Failed 😞");
      console.error(err);
    }
    setIsDisabled(false);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-3">
      {" "}
      <button
        className={
          !isDisabled
            ? "bg-red-700 hover:bg-yellow-400 rounded-xl px-1 py-1 ml-1 transition duration-300 ease-in-out shadow-lg text-lg justify-center items-center"
            : "px-1 py-1 ml-1 bg-slate-600 rounded-xl shadow-lg text-lg text-slate-400 justify-center items-center "
        }
        disabled={isDisabled}
        onClick={pauseWithdrawalHandler}
      >
        {pauseWithdrawal ? "Activate" : "Pause"} Withdrawal
      </button>
      <div className="text-base">Withdrawal is {pauseWithdrawal ? "Paused" : "Activated"}</div>
    </div>
  );
}

export default PauseWithdrawal;
