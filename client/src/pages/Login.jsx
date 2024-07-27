import LoginForm from "../components/LoginForm";



const Login = () => {

  return (
    <main className="flex h-full">
      <div className="w-2/4 hidden md:block bg-login bg-cover bg-no-repeat bg-center" />
      <div className="w-full h-full md:w-2/4 flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-semibold tracking-wider uppercase text-neutral-600">
            NeuroLink
          </h1>
          <p className="text-neutral-500">
            Let's bridge the gap, let's make the link,
            <br /> support us now, and let's see neurolink in a blink!
          </p>
        </div>
        <LoginForm />
        {/* <p>
          Don't Have an Account?
          <span
            className="underline ps-1 cursor-pointer text-blue-500"
            onClick={() => {
              navigate("/signup");
            }}
          >
            signup
          </span>
        </p> */}
      </div>
    </main>
  );
};

export default Login;
