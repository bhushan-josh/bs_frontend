import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useUpdateUserMutation } from "./userApi";
import Logout from "../auth/login/logout";
import { useState } from "react";
import { setAuth } from "../../redux/slices/authslice";

const TryProfile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.userData); // Get current user from Redux
  const [updateUserApi] = useUpdateUserMutation();
  const [editMode, setEditMode] = useState(false);

  // Ensure default values if userData is missing
  const [updatedUser, setUpdatedUser] = useState({
    first_name: currentUser?.first_name || "",
    last_name: currentUser?.last_name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
  });

  const handleEditClick = () => setEditMode(true);
  const handleCancel = () => setEditMode(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await updateUserApi({ id: currentUser.id, updatedData: updatedUser }).unwrap();

      // Update Redux state & LocalStorage
      const updatedUserData = response.data.data;
      dispatch(setAuth({ token: localStorage.getItem("token"), userData: updatedUserData }));
      localStorage.setItem("userData", JSON.stringify(updatedUserData));

      setEditMode(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-[550px] bg-white rounded-3xl shadow-2xl p-8 text-center">
        {/* Profile Image */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-36 h-36">
          <img 
            src="/assets/images/user.png" 
            alt="Profile" 
            className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg" 
          />
        </div>

        <div className="mt-16 space-y-4">
          {editMode ? (
            <>
              {/* Editable Fields */}
              <input className="border p-2 w-full rounded" name="first_name" value={updatedUser.first_name} onChange={handleChange} />
              <input className="border p-2 w-full rounded" name="last_name" value={updatedUser.last_name} onChange={handleChange} />
              <input className="border p-2 w-full rounded" name="email" value={updatedUser.email} onChange={handleChange} />
              <input className="border p-2 w-full rounded" name="phone" value={updatedUser.phone} onChange={handleChange} />
              
              {/* Action Buttons */}
              <div className="mt-4 space-x-2">
                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handleCancel}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              {/* Display User Info */}
              <h1 className="text-5xl font-bold text-gray-900">{currentUser?.first_name} {currentUser?.last_name}</h1>
              <p className="text-gray-600 text-lg">{currentUser?.email}</p>
              <p className="text-gray-500 text-lg">{currentUser?.phone}</p>
              
              {/* Edit Button */}
              <button 
                className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105 mt-4" 
                onClick={handleEditClick}
              >
                Edit
              </button>
              <button 
                className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105 mt-4" 
              >
                <Logout />
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default TryProfile;
