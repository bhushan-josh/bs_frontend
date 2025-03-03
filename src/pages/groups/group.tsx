import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGroups, selectGroups } from "../../redux/slices/groupsslice";
import CreateGroup from "./creategroup";
import EditGroup from "./editgroup";
import ErrorBoundary from "../../shared/ErrorBoundary";
import { useGetGroupsQuery } from "./groupApi";
import useDeleteGroup from "./deletegroup";
import CreateExpense from "../create_transaction/expense";
import GroupDetails from "./groupdetails";

interface Group {
  id: number;
  name: string;
  description: string;
  creator_id: number;
}

const GroupsList: React.FC = () => {
  const dispatch = useDispatch();
  const { data: groups, isSuccess } = useGetGroupsQuery();
  const storedGroups = useSelector(selectGroups);
  const { handleDeleteGroup } = useDeleteGroup();

  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [creatingExpenseGroup, setCreatingExpenseGroup] = useState<Group | null>(null);
  const [viewingGroupId, setViewingGroupId] = useState<number | null>(null); // Track the group ID for details

  useEffect(() => {
    if (isSuccess && groups) {
      dispatch(setGroups(groups));
    }
  }, [isSuccess, groups, dispatch]);

  if (!storedGroups || storedGroups.length === 0) {
    return <p className="text-gray-500">No groups available.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Groups List</h2>
      <ErrorBoundary>
        <CreateGroup />
      </ErrorBoundary>

      <ul>
        {storedGroups.map((group) => (
          <li key={group.id} className="p-2 border-b flex justify-between items-center">
            <span>{group.name}</span>
            <div className="space-x-2">
              <button
                onClick={() => setViewingGroupId(group.id)} // Set the group ID to fetch details
                className="text-blue-500 hover:text-blue-700"
              >
                View Details
              </button>
              <button
                onClick={() => setEditingGroup(group)}
                className="text-yellow-500 hover:text-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteGroup(group.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setCreatingExpenseGroup(group)}
                className="text-green-500 hover:text-green-700"
              >
                Add Expense
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Group Modal */}
      {editingGroup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <EditGroup group={editingGroup} onClose={() => setEditingGroup(null)} />
          </div>
        </div>
      )}

      {/* Create Expense Modal */}
      {creatingExpenseGroup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <CreateExpense group={creatingExpenseGroup} onClose={() => setCreatingExpenseGroup(null)} />
          </div>
        </div>
      )}

      {/* View Group Details Modal */}
      {viewingGroupId && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg">
          <ErrorBoundary>
            <GroupDetails groupId={viewingGroupId} onClose={() => setViewingGroupId(null)} />
          </ErrorBoundary>
        </div>
      </div>
    )}
    </div>
  );
};

export default GroupsList;