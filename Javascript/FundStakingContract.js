import { createERC20Instance } from "@/ethereum/createERC20";
import { stakingContractAddress } from "@/ethereum/createStaking";
import onFund from "@/utils/onFund";
import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import account from "@/ethereum/currentConnectedAccount";
import useInputState from "@/hooks/useInputState";
import { HomeContext } from "@/contexts/stakingContext";
import onNotify from "@/utils/onNotify";

function FundStakingContract() {
  console.log("outside everything in fund ");
  const [fundAmount, updateFundAmount, resetFundAmount] = useInputState("");
  const [spenderBalance, setSpenderBalance] = useState(0);
  const [spender, setSpender] = useState(0);
  const [ownerNTROBalance, setOwnerNTROBalance] = useState(0);

  const { isDisabled, setIsDisabled } = useContext(HomeContext);

  useEffect(() => {
    const setValue = async () => {
      try {
        const erc20Contract = await createERC20Instance();
        const stakingAddress = await stakingContractAddress();
        const spenderBalanceFromCall = await erc20Contract.balanceOf(stakingAddress);
        setSpenderBalance(
          // @ts-ignore
          ethers.utils.formatEther(spenderBalanceFromCall).toString()
        );
        const owner = await account();
        const ownerBalanceFromCall = await erc20Contract.balanceOf(owner);
        setOwnerNTROBalance(
          // @ts-ignore
          ethers.utils.formatEther(ownerBalanceFromCall).toString()
        );
        setSpender(stakingAddress);
      } catch (err) {
        console.error(err);
      }
    };
    setValue();
  }, [spenderBalance, ownerNTROBalance]);
  const fundHandler = async () => {
    try {
      setIsDisabled(true);
      if (fundAmount <= 0) {
        console.log("Enter valid input");
        resetFundAmount();
        throw new Error("Invalid Input");
      }
      await onFund(fundAmount, spender, setSpenderBalance);
      onNotify(true, "Contract Funded Enjoy!!😍 ");

      resetFundAmount();
    } catch (err) {
      onNotify(false, "Transaction Failed 😞 ");
      console.error(err);
    }
    setIsDisabled(false);
  };

  return (
    <div className=" p-5 flex flex-col justify-center items-center text-xl">
      <div className="mb-4 mt-4">
        <div>
          Balance of NTRO staking contract <b>{spenderBalance}</b> NTRO Tokens
        </div>
        <label htmlFor="fund" className="block text-gray-700 font-bold mb-2">
          Enter the amount to Fund the staking contract from your <b> {ownerNTROBalance}</b> NTRO Tokens
        </label>
        <input type="number" id="fund" value={fundAmount} onChange={updateFundAmount} className="border border-gray-300 py-2 px-4 rounded-md w-full" placeholder="No.of Tokens to fund" />
        <button
          className={
            !isDisabled
              ? "bg-teal-500 hover:bg-yellow-400 rounded-xl px-4 py-1  mt-3 transition duration-300 ease-in-out shadow-lg text-lg"
              : "px-4 py-1  bg-slate-600 rounded-xl shadow-lg text-lg text-slate-400 mt-3"
          }
          disabled={isDisabled}
          onClick={fundHandler}
        >
          Fund
        </button>
      </div>
    </div>
  );
}

export default FundStakingContract;
