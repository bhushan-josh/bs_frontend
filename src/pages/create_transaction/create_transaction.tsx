import { useNavigate } from "react-router-dom";

const CreateTransaction = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <button
        onClick={() => navigate("/friends")}
        className="inline-flex items-center px-4 py-4 text-lg font-bold transition-all duration-200 bg-transparent border rounded-xl hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
        Create a Transaction with Friend
      </button>
      <button
        onClick={() => navigate("/groups")}
        className="inline-flex items-center px-4 py-4 text-lg font-bold transition-all duration-200 bg-transparent border rounded-xl hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
        Create a Transaction with Group
      </button>
    </div>
  );
};

export default CreateTransaction;
