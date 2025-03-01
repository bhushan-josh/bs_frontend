import { useState } from "react";
import { useUpdateUserMutation } from "./api";

interface EditProfileFormProps {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  onCancel: () => void;
  onSaveSuccess: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ userId, firstName, lastName, email, phone, onCancel, onSaveSuccess }) => {
  const [formData, setFormData] = useState({ first_name: firstName, last_name: lastName, email, phone });
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Save Button
  const handleSave = async () => {
    try {
      await updateUser({ userId, ...formData }).unwrap();
      onSaveSuccess(); // Refresh user data
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
        placeholder="first_name"
      />
        <input
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        className="w-full border rounded-lg p-2 text-lg"
        placeholder="last_name"
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
