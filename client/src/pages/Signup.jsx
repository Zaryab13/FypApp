import React from "react";
import Signupform from "../components/SignupForm";

const Signup = () => {
  return (
    <main className="flex h-screen">
      <div className="hidden lg:w-[35%] md:block bg-login bg-cover bg-no-repeat bg-center" />
      <div className="w-full flex flex-col items-center gap-4 pt-4">
        <h2 className="text-3xl ">Create Account</h2>
        <Signupform />
      </div>
    </main>
  );
};

export default Signup;
