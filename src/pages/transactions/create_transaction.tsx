import { useNavigate } from "react-router-dom";

const CreateTransaction = () => {
  const navigate = useNavigate();
  return (
    <div
    className="flex justify-center items-center min-h-screen bg-cover bg-center"
    style={{
      backgroundImage: "url('src/assets/images/bg.jpg')",
      backgroundBlendMode: "overlay",
      backgroundColor: "rgba(255, 255, 255, 0.65)",
    }}
  >
    {/* App Title */}
    <div className="absolute left-[20%] transform -translate-x-1/2 top-[5%] text-4xl font-bold font-[Arial] text-gray-400">
      billsplitter
    </div>

    {/* Main Container */}
    <div className="relative w-[1400px] h-[700px] bg-white rounded-3xl shadow-xl flex flex-col justify-center items-center p-8">
      
      {/* Centered Buttons with Vertical Line */}
      <div className="flex items-center justify-center gap-10">
        
        {/* Transaction with Friend */}
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

        {/* Vertical Line */}
        <div className="h-14 border-l-2 border-gray-300"></div>

        {/* Transaction with Group */}
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
    </div>
  </div>
  );
};

export default CreateTransaction;
