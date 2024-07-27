import React from "react";

const Input = ({
  label,
  inputType,
  hasError,
  value,
  onChangeHandler,
  onBlurHandler,
  placeholder,
}) => {
  return (
    <div>
      <div>
        <label htmlFor="" className="text-black pb-1 font-medium">
          {label}
        </label>
      </div>
      <input
        type={inputType}
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        className={`outline-none w-full bg-zinc-200 px-2 py-1 border-2 rounded-lg placeholder:text-zinc-500 placeholder:font-medium transition-all ${
          hasError ? "border-red-500" : ""
        }`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
