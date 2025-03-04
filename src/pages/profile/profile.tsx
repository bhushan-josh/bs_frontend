import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Logout from "../auth/login/logout";

const ProfilePage = () => {
  const currentUser = useSelector((state: RootState) => state.auth.userData);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-[550px] bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-36 h-36">
          <img
            src="/assets/images/user.png"
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
          />
        </div>

        <div className="mt-16 space-y-4">
          <>
            <h1 className="text-5xl font-bold text-gray-900">
              {currentUser?.first_name} {currentUser?.last_name}
            </h1>
            <p className="text-gray-600 text-lg">{currentUser?.email}</p>
            <p className="text-gray-500 text-lg">{currentUser?.phone}</p>

            <button className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105 mt-4">
              <Logout />
            </button>
          </>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
