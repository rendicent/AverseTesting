import { ContractDataContext } from "@/contexts/contractDataContext";
import { HomeContext } from "@/contexts/stakingContext";
import useInputState from "@/hooks/useInputState";
import onNotify from "@/utils/onNotify";
import onWithdraw from "@/utils/onWithdraw";
import { useContext } from "react";

function Withdraw() {
  const [withdrawalAmount, updateWithdrawalAmount, reset] = useInputState("");
  const { setStakedTokens } = useContext(ContractDataContext);
  const { isDisabled, setIsDisabled } = useContext(HomeContext);
  const withdrawHandler = async () => {
    try {
      setIsDisabled(true);

      if (withdrawalAmount <= 0) {
        console.log("Enter valid input");
        reset();
        throw new Error("Invalid Input");
      }
      await onWithdraw(withdrawalAmount, setStakedTokens);
      onNotify(true, "Token Withdrawn");

      reset();
    } catch (err) {
      onNotify(false, "Transaction Failed 😞");
      console.error(err);
      reset();
    }
    setIsDisabled(false);
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <div>
        <form className="bg-white p-6 rounded-lg  text-center ">
          <label htmlFor="withdraw" className="block text-gray-700 font-bold mb-2"></label>
          <input
            id="withdraw"
            type="number"
            name="withdrawalAmount"
            placeholder="Tokens to withdraw"
            value={withdrawalAmount}
            className="border border-gray-300 py-2 px-2 rounded-md w-full"
            onChange={updateWithdrawalAmount}
          />
        </form>
      </div>
      <button
        className={
          !isDisabled
            ? "bg-teal-500 hover:bg-yellow-400 rounded-xl px-1 py-1 ml-1 transition duration-300 ease-in-out shadow-lg text-lg"
            : "px-1 py-1 ml-1 bg-slate-600 rounded-xl shadow-lg text-lg text-slate-400 "
        }
        disabled={isDisabled}
        onClick={withdrawHandler}
      >
        Withdraw Tokens
      </button>
    </div>
  );
}

export default Withdraw;
