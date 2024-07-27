import React, { useState } from "react";
import Input from "./UI/Input";
import useInput from "../hooks/use-input";
import Select from "react-select";

const SignUpForm = () => {
  const {
    value: enteredFirstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: firstNameReset,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredLastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredConfirmPassword,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: confirmPasswordReset,
  } = useInput((value) => value.trim() !== "");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [uploadedImageState, setUploadedImageState] = useState({});

  // const [maritalStatus, setMaritalStatus] = useState('');
  // const [maritalStatus, setMaritalStatus] = useState('');
  // const [maritalStatus, setMaritalStatus] = useState('');
  // const [maritalStatus, setMaritalStatus] = useState('');
  // const [maritalStatus, setMaritalStatus] = useState('');
  // const [maritalStatus, setMaritalStatus] = useState('');

  const formSubmitHandler = (e) => {
    e.preventDefault();

    console.log("Form Submitted");
  };

  return (
    <form
      className="w-[80%] max-w-[750px] py-8 px-8 rounded-md shadow-md"
      encType="multipart/form-data"
      onSubmit={formSubmitHandler}
    >
      <div className="grid grid-cols-2 gap-5 mb-6 ">
        <Input
          label="First Name"
          inputType="text"
          value={enteredFirstName}
          onChangeHandler={firstNameChangeHandler}
          onBlurHandler={firstNameBlurHandler}
          hasError={firstNameHasError}
        />
        <Input
          label="Last Name"
          inputType="text"
          value={enteredLastName}
          onChangeHandler={lastNameChangeHandler}
          onBlurHandler={lastNameBlurHandler}
          hasError={lastNameHasError}
        />
        <div>
          <label className="text-black pb-1 font-medium">Gender</label>
          <Select
            onChange={(e) => {
              setGender(e.value);
            }}
            options={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
              { label: "Prefer Not to say", value: "Prefer Not to say" },
            ]}
          />
        </div>
        <div>
          <label className="text-black pb-1 font-medium">Marital Status</label>
          <Select
            onChange={(e) => {
              setMaritalStatus(e.value);
            }}
            options={[
              { label: "Single", value: "Single" },
              { label: "Married", value: "Married" },
              { label: "Prefer Not to say", value: "Prefer Not to say" },
            ]}
          />
        </div>
        <Input
          label="Date of Birth"
          inputType="date"
          // value={enteredDob}
          // onChangeHandler={dobChangeHandler}
          // onBlurHandler={dobBlurHandler}
          // placeholder="Dob"
          // hasError={dobHasError}
        />
      </div>
      <div className="flex flex-col gap-2 mb-2">
        <label htmlFor="" className="font-medium">
          Upload Your Image
        </label>
        <input
          type="file"
          accept=".png, .jpeg, .jpg"
          onChange={(e) => {
            setUploadedImageState((prev) => {
              return {
                ...prev,
                image: e.target.files[0],
              };
            });

            console.log(uploadedImageState);
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-3">
        <Input
          label="Phone Number"
          inputType="number"
          // value={enteredPassword}
          // onChangeHandler={passwordChangeHandler}
          // onBlurHandler={passwordBlurHandler}
          // // placeholder="Phone Number"
          // hasError={passwordHasError}
        />
        <Input
          label="Email"
          inputType="email"
          // value={enteredPassword}
          // onChangeHandler={passwordChangeHandler}
          // onBlurHandler={passwordBlurHandler}
          // // placeholder="Password"
          // hasError={passwordHasError}
        />
        <Input
          label="Password"
          inputType="password"
          value={enteredPassword}
          onChangeHandler={passwordChangeHandler}
          onBlurHandler={passwordBlurHandler}
          // placeholder="Password"
          hasError={passwordHasError}
        />
        <Input
          label="Confirm Password"
          inputType="password"
          value={enteredConfirmPassword}
          onChangeHandler={confirmPasswordChangeHandler}
          onBlurHandler={confirmPasswordBlurHandler}
          // placeholder="ConfirmPassword"
          hasError={confirmPasswordHasError}
        />
      </div>
      <div>
        <button
          type="submit"
          className="px-4 py-2 flex items-center justify-center rounded-xl bg-transparent bg-gradient-to-r from-purple-500 to-blue-500 hover:bg-gradient-to-l hover:scale-110  active:scale-105  transition-all text-white font-semibold"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
