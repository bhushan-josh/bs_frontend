import { useState } from "react";
import { useUpdateUserMutation } from "./userApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setAuth } from "../../redux/slices/authslice";

interface EditProfileFormProps {
  onCancel: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ onCancel }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.userData);

  const [formData, setFormData] = useState({
    first_name: currentUser?.first_name || "",
    last_name: currentUser?.last_name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
  });

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await updateUser({ id: currentUser.id, updatedData: formData }).unwrap();
      
      // Update Redux & LocalStorage
      const updatedUserData = response.data.data;
      dispatch(setAuth({ token: localStorage.getItem("token"), userData: updatedUserData }));
      localStorage.setItem("userData", JSON.stringify(updatedUserData));

      onCancel(); // Close the form
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        className="w-full border rounded-lg p-2 text-lg"
        placeholder="First Name"
      />
      <input
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        className="w-full border rounded-lg p-2 text-lg"
        placeholder="Last Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border rounded-lg p-2 text-lg"
        placeholder="Email"
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border rounded-lg p-2 text-lg"
        placeholder="Phone"
      />

      {/* Buttons */}
      <div className="mt-4 space-x-4">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-600 transition-transform transform hover:scale-105"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-400 text-white px-6 py-3 rounded-full shadow-md hover:bg-gray-500 transition-transform transform hover:scale-105"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProfileForm;
