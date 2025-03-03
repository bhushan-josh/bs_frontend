import { useState } from "react";
import { 
  useGetGroupsQuery, 
  useUpdateGroupMutation, 
  useDeleteGroupMutation 
} from "./groupApi";
import CreateGroup from "./creategroup";

const GroupsList = () => {
  const { data: groups, error, isLoading, refetch } = useGetGroupsQuery(); 
  const [updateGroup] = useUpdateGroupMutation();
  const [deleteGroup] = useDeleteGroupMutation();
  const [editingGroup, setEditingGroup] = useState<{ id: number; name: string } | null>(null);
  const [newName, setNewName] = useState("");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error fetching groups</p>;

  if (!groups || groups.length === 0) {
    return <p className="text-gray-500">No groups available.</p>;
  }

  const handleEditClick = (group: { id: number; name: string }) => {
    setEditingGroup(group);
    setNewName(group.name);
  };

  const handleUpdate = async () => {
    if (editingGroup) {
      await updateGroup({ id: editingGroup.id, updatedGroup: { name: newName } });
      setEditingGroup(null);
      refetch(); // Refresh group list after update
    }
  };

  const handleDelete = async (groupId: number) => {
    await deleteGroup(groupId);
    refetch(); // Refresh group list after delete
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Groups List</h2>
      <CreateGroup/>
      <ul>
        {groups.map((group) => (
          <li key={group.id} className="p-2 border-b flex justify-between items-center">
            {editingGroup?.id === group.id ? (
              <input 
                type="text" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)}
                className="border px-2 py-1 rounded"
              />
            ) : (
              <span>{group.name}</span>
            )}
            <div className="space-x-2">
              {editingGroup?.id === group.id ? (
                <button 
                  onClick={handleUpdate} 
                  className="px-3 py-1 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition"
                >
                  Save
                </button>
              ) : (
                <button 
                  onClick={() => handleEditClick(group)} 
                  className="px-3 py-1 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
              )}
              <button 
                onClick={() => handleDelete(group.id)} 
                className="px-3 py-1 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupsList;
