import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const onNotify = (success, value) => {
  if (success) {
    toast.success(`${value}`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  } else {
    toast.error(`${value}`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

export default onNotify;
