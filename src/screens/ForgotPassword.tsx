import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 bg-slate-500 h-screen w-full">
        <div className="border h-80 sm:w-1/3 w-96 bg-sky-700 p-5">
          <div className="flex items-center justify-center text-white text-3xl font-bold">
            Forgot Password
          </div>
          <div className="flex items-center justify-center text-slate-300 text-sm">
            Enter your registered email to reset your password.
          </div>
          <div className="ml-5 mt-5">
            <input
              type="email"
              name="email"
              className="sm:w-96 h-5 w-80 bg-transparent border-b-2 border-slate-500 outline-none"
            />
            <span className="text-white">Email</span>
          </div>
          <div className="flex items-center justify-center sm:w-96 h-10 w-80 border border-white bg-transparent ml-5 mt-5 cursor-pointer font-semibold">
            Reset Password
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-center ml-2 mt-2 space-x-1 text-sm">
              <div className="text-white">New here?</div>
              <div
                className="cursor-pointer text-white"
                onClick={() => navigate("/register")}
              >
                Sign Up.
              </div>
            </div>
            <div className="flex items-center justify-center space-x-1 text-sm">
              <div className="text-white">Already have an account?</div>
              <div
                className="cursor-pointer text-white"
                onClick={() => navigate("/login")}
              >
                Sign In.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
