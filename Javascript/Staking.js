import { HomeContext } from "@/contexts/stakingContext";
import { useContext, useState } from "react";
import Form from "./Form";
import Modal from "./Modal";

function Staking() {
  const [showModalCollect, setShowModalCollect] = useState(false);
  const { isDisabled } = useContext(HomeContext);

  return (
    <div>
      <button
        className={
          !isDisabled
            ? "bg-teal-500 hover:bg-yellow-400 rounded-xl px-4 py-2 mt-10 transition duration-300 ease-in-out shadow-lg"
            : " px-4 py-2 mt-10 bg-slate-600 rounded-xl shadow-lg text-lg text-slate-400 "
        }
        disabled={isDisabled}
        onClick={() => {
          setShowModalCollect(true);
        }}
      >
        Stake tokens
      </button>

      <Modal isVisible={showModalCollect} onClose={() => setShowModalCollect(false)}>
        <Form onClose={() => setShowModalCollect(false)} />
      </Modal>
    </div>
  );
}

export default Staking;
