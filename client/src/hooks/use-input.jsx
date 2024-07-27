import { useState } from "react";

const useInput = (validate) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validate(enteredValue);
  const hasError = !isValid && isTouched;

  const ChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const BlurHandler = (event) => {
      setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid,
    hasError,
    ChangeHandler,
    BlurHandler,
    reset,
  };
};

export default useInput;
