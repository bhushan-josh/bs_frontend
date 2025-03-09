import { useNavigate } from "react-router-dom";
import { useSignupUserMutation } from "../authApi";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const navigate = useNavigate();
  const [signupUser, { isLoading, error }] = useSignupUserMutation();

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await signupUser(values).unwrap();

        toast("Signup Successful, Please Login", {
          description: new Date().toTimeString(),
        });

        navigate("/login");
      } catch (err) {
        console.error("Signup failed:", err);
      }
    },
  });

  return (
    <div className="font-inter overflow-hidden flex justify-center relative min-h-screen bg-gray-100">
      <div className="mx-auto max-w-lg px-6 lg:px-8 absolute py-20">
        <img
          src="src/assets/images/logo.png"
          alt="billsplitter logo"
          className="mx-auto lg:mb-11 mb-8 object-cover"
          onClick={() => navigate("/")}
        />

        <div className="rounded-2xl bg-white shadow-xl p-7 lg:p-11">
          <h1 className="text-gray-900 text-center text-3xl font-bold mb-2">Create an Account</h1>
          <p className="text-gray-500 text-center text-base font-medium mb-6">Sign up to start splitting bills easily</p>

          {error && <p className="text-red-600 text-center mb-4">Signup failed. Please try again.</p>}

          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="First Name"
              className="w-full h-12 text-gray-900 placeholder-gray-400 text-lg rounded-full border-gray-300 border shadow-sm px-4 mb-4"
            />
            {formik.touched.first_name && formik.errors.first_name ? (
              <p className="text-red-600 text-sm mb-2">{formik.errors.first_name}</p>
            ) : null}

            <input
              type="text"
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Last Name"
              className="w-full h-12 text-gray-900 placeholder-gray-400 text-lg rounded-full border-gray-300 border shadow-sm px-4 mb-4"
            />
            {formik.touched.last_name && formik.errors.last_name ? (
              <p className="text-red-600 text-sm mb-2">{formik.errors.last_name}</p>
            ) : null}

            <input
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Phone"
              className="w-full h-12 text-gray-900 placeholder-gray-400 text-lg rounded-full border-gray-300 border shadow-sm px-4 mb-4"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <p className="text-red-600 text-sm mb-2">{formik.errors.phone}</p>
            ) : null}

            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Email"
              className="w-full h-12 text-gray-900 placeholder-gray-400 text-lg rounded-full border-gray-300 border shadow-sm px-4 mb-4"
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
              className="w-full h-12 text-gray-900 placeholder-gray-400 text-lg rounded-full border-gray-300 border shadow-sm px-4 mb-4"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-600 text-sm mb-2">{formik.errors.password}</p>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full h-12 text-white text-base font-semibold rounded-full transition-all duration-300 bg-gray-800 shadow-sm mb-6 ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
              }`}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

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