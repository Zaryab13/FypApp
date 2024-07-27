import React, { useState } from "react";
import useInput from "../hooks/use-input";
import useAuth from "../hooks/useAuth";
import { login } from "../features/authSlice";

import { useLocation, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import useToast from "../hooks/useToast";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { dispatch } = useAuth();
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    ChangeHandler: emailChangeHandler,
    BlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput((value) => value.trim().includes("@"));

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    ChangeHandler: passwordChangeHandler,
    BlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput((value) => value.trim() !== "");

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!emailIsValid || !passwordIsValid) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        showToast(data.message, "error");
        return;
      }

      setIsLoading(false);
      dispatch(login(data));
      showToast("Logged In Successfully", "success");
      if (data.role === "user") {
        navigate(from, { replace: true });
      } else if (data.role === "admin") {
        navigate("/admin", { replace: true });
      }
    } catch (error) {
      setIsLoading(false);
      showToast("Authentication failed!", "error");
    }
  };

  return (
    <form
      className="flex flex-col gap-5 py-4 w-[90%] sm:w-2/4 md:w-[348px]"
      onSubmit={formSubmitHandler}
    >
      {/* <Input
        label="Your Email"
        inputType="email"
        value={enteredEmail}
        onChangeHandler={emailChangeHandler}
        onBlurHandler={emailBlurHandler}
        placeholder="Email"
        hasError={emailHasError}
      /> */}
      <TextField
        label="Email"
        type="email"
        autoFocus={true}
        value={enteredEmail}
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        placeholder="Email"
        error={emailHasError}
      />
      <TextField
        label="Password"
        type="password"
        value={enteredPassword}
        onChange={passwordChangeHandler}
        onBlur={passwordBlurHandler}
        placeholder="Password"
        error={passwordHasError}
      />
      <button
        type="submit"
        className="px-4 py-2 flex items-center justify-center rounded-md border border-transparent hover:border-Accent bg-secondary hover:bg-transparent hover:text-secondary hover:scale-105 active:scale-105 transition-all text-white font-semibold"
        disabled={isLoading}
      >
        {isLoading ? (
          <div role="status flex items-center gap-4">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
