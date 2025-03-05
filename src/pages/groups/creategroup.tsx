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
      onClose()
    } catch (error: any) {
      console.error("Error creating group:", error);
      toast.error(error?.data?.message || "Failed to create group.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
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
        placeholder="Group Description (Optional)"
        className="w-full p-2 border rounded mb-2"
      />

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

      {members.length > 0 && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">Selected Members</h3>
          {members.map((id) => {
            const user = users.find((u) => u.id === id);
            return (
              <div key={id} className="flex justify-between items-center bg-gray-100 p-2 rounded mb-1">
                <span>{user ? `${user.first_name} ${user.last_name}` : `User ID: ${id}`}</span>
                <button className="text-red-500" onClick={() => handleRemoveMember(id)}>
                  Remove
                </button>
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
