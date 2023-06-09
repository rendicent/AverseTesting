import { ContractDataContext } from "@/contexts/contractDataContext";
import { HomeContext } from "@/contexts/stakingContext";
import useInputState from "@/hooks/useInputState";
import onApprove from "@/utils/onApprove";
import onNotify from "@/utils/onNotify";
import onStake from "@/utils/onStake";

import React, { useContext, useState } from "react";

function Form({ onClose }) {
  const [amount, updateAmount, resetAmount] = useInputState("");
  const [stakeAmount, updateStakeAmount, resetStakeAmount] = useInputState("");
  const { setStakedTokens, approvedTokens, setApprovedTokens } = useContext(ContractDataContext);
  const { isDisabled, setIsDisabled } = useContext(HomeContext);
  const approveHandler = async () => {
    try {
      setIsDisabled(true);
      if (amount <= 0) {
        console.log("Enter valid input");
        resetAmount();
        throw new Error("Invalid Input");
      }
      await onApprove(amount, setApprovedTokens);
      onNotify(true, "Tokens Approved");

      resetAmount();
    } catch (err) {
      console.error(err);
      onNotify(false, "Transaction Failed ");
    }
    setIsDisabled(false);
  };

  const stakeHandler = async () => {
    try {
      setIsDisabled(true);
      if (stakeAmount <= 0) {
        console.log("Enter valid input");
        resetStakeAmount();
        throw new Error("Invalid Input");
      }
      await onStake(stakeAmount, setStakedTokens);
      onNotify(true, "Tokens Staked");
      onClose();

      resetStakeAmount();
    } catch (err) {
      onNotify(false, "Transaction Failed ");
      console.error(err);
    }
    setIsDisabled(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form className="bg-white p-6 rounded-lg  text-center " onSubmit={handleSubmit}>
        <div>
          <label htmlFor="approve" className="block text-gray-700 font-bold mb-2">
            Enter the amount to Approve
          </label>
          <input id="approve" type="number" name="amount" placeholder="No.of Tokens to approve" value={amount} className="border border-gray-300 py-2 px-4 rounded-md w-full" onChange={updateAmount} />
          <button
            className={!isDisabled ? "mt-2 bg-teal-500 hover:bg-secondary font-bold py-2 px-4 rounded" : "mt-2 bg-slate-600 font-bold py-2 px-4 rounded text-slate-400 "}
            disabled={isDisabled}
            onClick={approveHandler}
          >
            Approve
          </button>
        </div>
        <hr />
        <h3>You have approved {approvedTokens} tokens to be staked</h3>
        <div className="mb-4 mt-4">
          <label htmlFor="stake" className="block text-gray-700 font-bold mb-2">
            Enter the amount to stake
          </label>
          <input type="number" id="stake" value={stakeAmount} onChange={updateStakeAmount} className="border border-gray-300 py-2 px-4 rounded-md w-full" placeholder="No.of Tokens to stake" />
          <button
            className={!isDisabled ? "mt-2 bg-teal-500 hover:bg-secondary font-bold py-2 px-4 rounded" : "mt-2 bg-slate-600 font-bold py-2 px-4 rounded text-slate-400 "}
            disabled={isDisabled}
            onClick={stakeHandler}
          >
            Stake
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
