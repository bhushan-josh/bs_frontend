import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Logout from "../auth/login/logout";
import { Button } from "../../shared/components/button";

const ProfilePage = () => {
  const currentUser = useSelector((state: RootState) => state.auth.userData);

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('src/assets/images/bg.jpg')",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(255, 255, 255, 0.65)",
      }}
      >
      <div className="absolute left-[20%] transform -translate-x-1/2 top-[5%] text-4xl font-bold font-[Arial] text-gray-400">
        billsplitter
      </div>

      <div className="relative w-[1400px] h-[700px] bg-white rounded-3xl shadow-xl overflow-hidden flex gap-x-24 -mt-6">
        <div className="absolute top-[6%] right-[26%] flex items-center gap-4">
          <h2 className="absolute top-4 left-6 text-2xl font-bold text-gray-800">
            Profile
          </h2>
        </div>
        <div className="absolute top-[8%] right-[8%] flex items-center gap-4">
          <div className="w-[2px] h-8 bg-gray-300"></div>
          <Button variant="link" className="text-lg p-4">
            <Logout />
          </Button>
        </div>

        <div className="w-[50%] flex justify-end items-center ml-[-8%]">
          <div className="w-80 h-80">
            <img
              src="src/assets/images/profile.jpeg"
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-[12px] border-white shadow-xl"
            />
          </div>
        </div>

        <div className="w-[55%] flex items-center pl-8">
          <div className="space-y-4 text-left">
            <h3>/User Details</h3>
            <h1 className="text-6xl font-black text-gray-900 capitalize">
              {currentUser?.first_name} {currentUser?.last_name}
            </h1>
            <div className="space-y-2">
              <p className="text-gray-600 text-lg">
                <span className="font-semibold">Email:</span>{" "}
                {currentUser?.email}
              </p>
              <p className="text-gray-500 text-lg">
                <span className="font-semibold">Phone:</span>{" "}
                {currentUser?.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
