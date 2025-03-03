import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "sonner";
import { useGetUsersQuery } from "../friends/usersApi";
import { useUpdateGroupMutation, useGetGroupsQuery } from "./groupApi";
import { updateGroup, setGroups } from "../../redux/slices/groupsslice";

const EditGroup = ({ group, onClose }: { group: any; onClose: () => void }) => {
  const dispatch = useDispatch();
  
  // State for form inputs
  const [name, setName] = useState(group.name);
  const [description, setDescription] = useState(group.description || "");
  const [members, setMembers] = useState<{ id?: number; member_id: number; _destroy?: number; role?: number }[]>(group.group_members || []);

  const { data: users = [] } = useGetUsersQuery(); // Fetch users
  const { refetch } = useGetGroupsQuery(); // Fetch groups
  const [updateGroupAPI, { isLoading }] = useUpdateGroupMutation();

  const currentUser = useSelector((state: RootState) => state.auth.userData);

  useEffect(() => {
    console.log("Users loaded:", users);
  }, [users]);

  const handleAddMember = (memberId: number) => {
    // Check if already exists
    if (members.some((m) => m.member_id === memberId && !m._destroy)) {
      toast.warning("Member already added.");
      return;
    }
    
    setMembers([...members, { member_id: memberId, role: 1 }]);
  };

  const handleRemoveMember = (memberId: number) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.member_id === memberId ? { ...m, _destroy: memberId } : m
      )
    );
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Group name is required.");
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
        description,
        group_members_attributes: members, // Contains add & remove logic dynamically
      };

      console.log("Payload sent to API:", JSON.stringify(payload, null, 2));

      // Send update request
      const updatedGroup = await updateGroupAPI({ id: group.id, ...payload }).unwrap();

      // ✅ Update Redux store
      dispatch(updateGroup(updatedGroup));

      toast.success("Group updated successfully!");

      // ✅ Refetch groups and update Redux
      const { data: updatedGroups } = await refetch();
      if (updatedGroups) {
        dispatch(setGroups(updatedGroups)); // Update Redux store
      }

      onClose(); // Close modal or form after success
    } catch (error: any) {
      console.error("Error updating group:", error);
      toast.error(error?.data?.message || "Failed to update group.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Group</h2>

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
      <label className="block font-medium mb-2">Add Members</label>
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
          <h3 className="font-medium mb-2">Members</h3>
          {members.map((m) => {
            const user = users.find((u) => u.id === m.member_id);
            return (
              <div
                key={m.member_id}
                className={`flex justify-between items-center p-2 rounded mb-1 ${
                  m._destroy ? "bg-red-200" : "bg-gray-100"
                }`}
              >
                <span>{user ? `${user.first_name} ${user.last_name}` : `User ID: ${m.member_id}`}</span>
                {!m._destroy ? (
                  <button
                    className="text-red-500"
                    onClick={() => handleRemoveMember(m.member_id)}
                  >
                    Remove
                  </button>
                ) : (
                  <span className="text-red-600">Pending removal</span>
                )}
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`w-full text-white p-2 rounded ${isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
      >
        {isLoading ? "Updating..." : "Update Group"}
      </button>

      <button onClick={onClose} className="w-full mt-2 text-gray-600 p-2 border rounded">
        Cancel
      </button>
    </div>
  );
};

export default EditGroup;
