import { useLoginUserMutation } from "../authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setAuth } from "../../../redux/slices/authslice";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await loginUser(values).unwrap();
        const { token, ...userData } = response.data;

        dispatch(setAuth({ token, userData }));
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(userData));

        toast.success("Logged in successfully", {
          description: new Date().toTimeString(),
        });

        navigate("/home");
      } catch (err) {
        console.error("Login failed:", err);
        toast.error("Login failed. Please check your credentials.");
      }
    },
  });

  return (
    <div className="font-inter overflow-hidden flex justify-center relative min-h-screen bg-gray-100">
      <div className="mx-auto max-w-lg px-6 lg:px-8 absolute py-20">
        <img
          src="src/assets/images/logo.png"
          alt="billspitter logo"
          className="mx-auto lg:mb-11 mb-8 object-cover"
          onClick={() => navigate("/")}
        />

        <div className="rounded-2xl bg-white shadow-xl p-7 lg:p-11">
          <h1 className="text-gray-900 text-center text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-500 text-center text-base font-medium mb-6">
            Let’s split the bills for better accountability.
          </p>

          {error && <p className="text-red-600 text-center mb-4">Login failed. Try again.</p>}

          <form onSubmit={formik.handleSubmit}>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Email"
              className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-4"
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-600 text-sm mb-2">{formik.errors.email}</p>
            ) : null}

            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Password"
              className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-1"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-600 text-sm mb-2">{formik.errors.password}</p>
            ) : null}

            <div className="flex justify-end mb-6">
              <a href="#" className="text-indigo-600 text-base font-normal">Forgot Password?</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full h-12 text-white text-base font-semibold rounded-full transition-all duration-300 bg-gray-800 shadow-sm mb-6 ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

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
  );
};

export default Login;