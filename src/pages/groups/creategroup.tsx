import { useState, useEffect } from "react";
import { useCreateGroupMutation } from "./groupApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "sonner";
import FetchUsers from "../friends/fetchusers";
import { useGetUsersQuery } from "../friends/usersApi";

const CreateGroup = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState<number[]>([]);
  const [createGroup, { isLoading }] = useCreateGroupMutation();

  const currentUser = useSelector((state: RootState) => state.auth.userData);
  const { data: users = [], refetch } = useGetUsersQuery(); // Fetch & refetch users

  // Debugging: Check if users are loaded
  useEffect(() => {
    console.log("Users in Redux:", users);
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
    if (!name || !description || members.length === 0) {
      toast.error("Please fill all fields and add at least one member.");
      return;
    }

    try {
      const payload = {
        name,
        creator_id: currentUser?.id,
        description,
        group_members_attributes: members.map((id) => ({ member_id: id })),
      };

      await createGroup(payload).unwrap();

      toast.success("Group created successfully!");
      refetch(); // ✅ Refetch users after creating a group

      setName("");
      setDescription("");
      setMembers([]);
    } catch (error) {
      console.error("Error creating group:", error);
      toast.error("Failed to create group.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <FetchUsers /> {/* Ensures users are fetched at component load */}

      <h2 className="text-xl font-bold mb-4">Create a New Group</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Group Name"
        className="w-full p-2 border rounded mb-2"
      />

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Group Description"
        className="w-full p-2 border rounded mb-2"
      />

      {/* Users Dropdown */}
      <label className="block font-medium mb-2">Select Members</label>
      <select
        onChange={(e) => handleAddMember(Number(e.target.value))}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="">-- Select User --</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.first_name} {user.last_name} ({user.email})
          </option>
        ))}
      </select>

      {/* Selected Members List */}
      {members.length > 0 && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">Selected Members</h3>
          {members.map((id) => {
            const user = users.find((u) => u.id === id);
            return (
              <div key={id} className="flex justify-between items-center bg-gray-100 p-2 rounded mb-1">
                <span>{user ? `${user.first_name} ${user.last_name}` : `User ID: ${id}`}</span>
                <button className="text-red-500" onClick={() => handleRemoveMember(id)}>Remove</button>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`w-full text-white p-2 rounded ${isLoading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
      >
        {isLoading ? "Creating..." : "Create Group"}
      </button>
    </div>
  );
};

export default CreateGroup;
