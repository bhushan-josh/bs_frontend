import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignupUserMutation } from "../authapi";
import { toast } from "sonner";

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [signupUser, { isLoading, error }] = useSignupUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      await signupUser(formData).unwrap();

      const currentDateTime = new Date();

      toast("Sigup Successfully, Please Login", {
        description: currentDateTime.toTimeString()})
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="font-inter overflow-hidden flex justify-center relative min-h-screen bg-gray-100">
    {/* <img
      src="https://pagedone.io/asset/uploads/1702362010.png"
      alt="gradient background"
      className="w-full h-full object-cover fixed"
    /> */}


    <div className="mx-auto max-w-lg px-6 lg:px-8 absolute py-20">
      <img
        src="src/assets/images/logo.webp"
        alt="billsplitter logo"
        className="mx-auto lg:mb-11 mb-8 object-cover"
        onClick={()=>navigate("/")}
      />

      <div className="rounded-2xl bg-white shadow-xl p-7 lg:p-11">
        <h1 className="text-gray-900 text-center text-3xl font-bold mb-2">Create an Account</h1>
        <p className="text-gray-500 text-center text-base font-medium mb-6">Sign up to start splitting bills easily</p>

        {error && <p className="text-red-600 text-center mb-4">Signup failed. Please try again.</p>}

        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full h-12 text-gray-900 placeholder-gray-400 text-lg rounded-full border-gray-300 border shadow-sm px-4 mb-4"
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full h-12 text-gray-900 placeholder-gray-400 text-lg rounded-full border-gray-300 border shadow-sm px-4 mb-4"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full h-12 text-gray-900 placeholder-gray-400 text-lg rounded-full border-gray-300 border shadow-sm px-4 mb-4"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full h-12 text-gray-900 placeholder-gray-400 text-lg rounded-full border-gray-300 border shadow-sm px-4 mb-4"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full h-12 text-gray-900 placeholder-gray-400 text-lg rounded-full border-gray-300 border shadow-sm px-4 mb-4"
        />

        <button
          onClick={handleSignup}
          disabled={isLoading}
          className={`w-full h-12 text-white text-base font-semibold rounded-full transition-all duration-300 bg-gray-800 shadow-sm mb-6 ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
          }`}
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>

        <div className="flex justify-center">
          <p className="text-gray-900 text-base font-medium">
            Already have an account?
            <span onClick={() => navigate("/login")} className="text-indigo-600 font-semibold pl-2 cursor-pointer">
              Log In
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Signup;
