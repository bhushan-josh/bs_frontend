import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "sonner";
import { useGetUsersQuery } from "../friends/usersApi";
import { useCreateGroupMutation, useGetGroupsQuery } from "./groupApi";
import { addGroup, setGroups } from "../../redux/slices/groupsslice";

const CreateGroup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState<number[]>([]);

  const { data: users = [] } = useGetUsersQuery();
  const { refetch } = useGetGroupsQuery();
  const [createGroup, { isLoading }] = useCreateGroupMutation();

  const currentUser = useSelector((state: RootState) => state.auth.userData);

  useEffect(() => {
    console.log("Users loaded:", users);
  }, [users]);

  const handleAddMember = (memberId: number) => {
    if (!members.includes(memberId)) {
      setMembers([...members, memberId]);
    } else {
      toast.warning("Member already added.");
    }
  };

  const handleRemoveMember = (memberId: number) => {
    setMembers(members.filter((id) => id !== memberId));
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Group name is required.");
      return;
    }

    if (members.length === 0) {
      toast.error("At least one member is required.");
      return;
    }

    if (!currentUser?.id) {
      toast.error("Error: No authenticated user.");
      console.error("No authenticated user found:", currentUser);
      return;
    }

    try {
      const payload = {
        name,
        creator_id: currentUser.id,
        description,
        group_members_attributes: members.map((id) => ({ member_id: id })),
      };

      // console.log("Payload sent to API:", JSON.stringify(payload, null, 2));

      const newGroup = await createGroup(payload).unwrap();

      dispatch(addGroup(newGroup));

      toast.success("Group created successfully!");

      const { data: updatedGroups } = await refetch();
      if (updatedGroups) {
        dispatch(setGroups(updatedGroups));
      }

      setName("");
      setDescription("");
      setMembers([]);
      onClose();
    } catch (error: any) {
      console.error("Error creating group:", error);
      toast.error(error?.data?.message || "Failed to create group.");
    }
  };

  return (
    <div className="p-8 bg-white shadow-2xl rounded-xl max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Create a New Group
      </h2>

      {/* Group Name Input */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Group Name"
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-500 outline-none mb-3"
      />

      {/* Group Description Input */}
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Group Description"
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-500 outline-none mb-3"
      />

      {/* Select Members */}
      <label className="block font-semibold text-gray-700 mt-4 mb-2">
        Select Members
      </label>
      <select
        onChange={(e) => handleAddMember(Number(e.target.value))}
        className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-400 focus:border-green-500 outline-none mb-3"
      >
        <option value="">-- Select User --</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.first_name} {user.last_name} ({user.email})
          </option>
        ))}
      </select>

      {/* Selected Members List */}
{/* Selected Members List */}
{members.length > 0 && (
  <div className="mt-4 max-h-40 overflow-hidden">
    <h3 className="font-semibold text-gray-700 mb-2">Selected Members</h3>
    <div className="h-32 overflow-y-auto border border-gray-300 rounded-lg p-2">
      {members.map((id) => {
        const user = users.find((u) => u.id === id);
        return (
          <div
            key={id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded-lg shadow"
          >
            <span className="text-gray-800">
              {user
                ? `${user.first_name} ${user.last_name}`
                : `User ID: ${id}`}
            </span>
            <button
              className="text-red-500 font-semibold hover:text-red-700 transition"
              onClick={() => handleRemoveMember(id)}
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  </div>
)}


      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`w-full text-white p-3 rounded-lg font-semibold transition-all mt-6 ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {isLoading ? "Creating..." : "Create Group"}
      </button>
    </div>
  );
};

export default CreateGroup;
