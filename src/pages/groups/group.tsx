import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGroups, selectGroups } from "../../redux/slices/groupsslice";
import CreateGroup from "./creategroup";
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
  const { data: groups, isSuccess, isError, error } = useGetGroupsQuery();
  const storedGroups = useSelector(selectGroups);
  const { handleDeleteGroup } = useDeleteGroup();

  const [creatingExpenseGroup, setCreatingExpenseGroup] = useState<number | null>(null);
  const [viewingGroupId, setViewingGroupId] = useState<number | null>(null);

  useEffect(() => {
    if (isSuccess && groups) {
      dispatch(setGroups(groups));
    }
  }, [isSuccess, groups, dispatch]);

  if (isError) {
    return <p className="text-red-500">Error loading groups: {error?.message}</p>;
  }

  if (!storedGroups || storedGroups.length === 0) {
    return <p className="text-gray-500">No groups available. Create a new group to get started.</p>;
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
                onClick={() => setCreatingExpenseGroup(group.id)}
                className="text-green-500 hover:text-green-700"
              >
                Add Expense
              </button>
              <button
                onClick={() => setViewingGroupId(group.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                View Details
              </button>
              <button
                onClick={() => handleDeleteGroup(group.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Create Expense Modal */}
      {creatingExpenseGroup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <CreateExpense groupId={creatingExpenseGroup} onClose={() => setCreatingExpenseGroup(null)} />
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