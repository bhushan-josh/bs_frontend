import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-screen w-full flex flex-col justify-center items-center bg-[#ffffff]">
        <h1 className="text-9xl font-extrabold text-black tracking-widest">
          404
        </h1>
        <div className="bg-[#ffffff] px-8 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>

        <button
          onClick={() => navigate("/home")}
          className="inline-flex items-center px-4 py-2 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-xl hover:bg-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          <IconChevronLeft />
          Go Back Home
        </button>
      </div>
    </>
  );
};
export default ErrorPage;
