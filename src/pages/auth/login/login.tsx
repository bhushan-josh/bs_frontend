import { useState } from "react";
import { useLoginUserMutation } from "../authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password }).unwrap();

      localStorage.setItem("token", response.data.token);

      const currentDateTime = new Date();
      toast("Log in Successfully", {
        description: currentDateTime.toTimeString()})
      navigate("/home");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div>
    <div className="font-inter overflow-hidden flex justify-center relative min-h-screen bg-gray-100">
      {/* <img
        src="https://pagedone.io/asset/uploads/1702362010.png"
        alt="gradient background"
        className="w-full h-full object-cover fixed"
      /> */}

      <div className="mx-auto max-w-lg px-6 lg:px-8 absolute py-20">
        <img
          src="src/assets/images/logo.webp"
          alt="billspitter logo"
          className="mx-auto lg:mb-11 mb-8 object-cover"
          onClick={()=> navigate("/")}
        />
            {/* <span onClick={() => navigate("/")} className="test-indigo-600 font-semibold pl-2 cursor-pointer">
        Go back
      </span> */}

        <div className="rounded-2xl bg-white shadow-xl p-7 lg:p-11">
          <h1 className="text-gray-900 text-center text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-500 text-center text-base font-medium mb-6">Let Split the bills for better accountablity</p>

          {error && <p className="text-red-600 text-center mb-4">Login failed. Please check your credentials.</p>}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-4"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-1"
          />

          <div className="flex justify-end mb-6">
            <a href="#" className="text-indigo-600 text-base font-normal">Forgot Password?</a>
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className={`w-full h-12 text-white text-base font-semibold rounded-full transition-all duration-300 bg-gray-800 shadow-sm mb-6 ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <div className="flex justify-center">
            <p className="text-gray-900 text-base font-medium">
              Don't have an account?
              <span onClick={() => navigate("/signup")} className="text-indigo-600 font-semibold pl-2 cursor-pointer">
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
