import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetUserDataQuery } from "./userApi";
import Logout from "../auth/login/logout";
import { useState } from "react";
import EditProfileForm from "./editprofile";

const UserProfile = () => {
  const userId = useSelector((state: RootState) => state.auth.userData.id);
  const { data, error, isLoading, refetch } = useGetUserDataQuery({ userId });

  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveSuccess = () => {
    setEditMode(false);
    refetch(); // Refresh user data
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-0">
      <div className="relative w-[550px] bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-36 h-36">
          <img
            src="src/assets/images/user.png"
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
            />
        </div>



        <div className="mt-16 space-y-4">
          {isLoading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">Error fetching user data</p>}
          {data && (
            <>
              {editMode ? (
                <EditProfileForm
                  userId={userId}
                  firstName={data?.data?.first_name}
                  lastName={data?.data?.last_name}
                  email={data?.data?.email}
                  phone={data?.data?.phone}
                  onCancel={() => setEditMode(false)}
                  onSaveSuccess={handleSaveSuccess}
                />
              ) : (
                <>
                  <h1 className="text-5xl font-bold text-gray-900">{data?.data?.first_name} {data?.data?.last_name}</h1>
                  <p className="text-gray-600 text-lg">{data?.data?.email}</p>
                  <p className="text-gray-500 text-lg">{data?.data?.phone}</p>
                </>
              )}
            </>
          )}
        </div>

        {!editMode && (
          <div className="mt-6">
            <div className="space-x-4">
              <button
                onClick={handleEditClick}
                className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
              >
                Update
              </button>
              <button className="bg-gray-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-gray-600 transition-transform transform hover:scale-105">
                <Logout />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
