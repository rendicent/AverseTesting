import { useState } from "react";

function useInputState(initialVal) {
  const [state, setState] = useState(initialVal);
  const updateValue = (e) => {
    setState(e.target.value);
  };
  const reset = () => {
    setState("");
  };

  const value = state;
  return [value, updateValue, reset];
}

export default useInputState;
