import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGroups, selectGroups } from "../../redux/slices/groupsslice";
import CreateGroup from "./creategroup";
import ErrorBoundary from "../../shared/ErrorBoundary";
import { useGetGroupsQuery } from "./groupApi";
import useDeleteGroup from "./deletegroup";
import GroupDetails from "./groupdetails";
import CreateExpense from "../transactions/expense";

const GroupsList: React.FC = () => {
  const dispatch = useDispatch();
  const { data: groups, isSuccess } = useGetGroupsQuery();
  const storedGroups = useSelector(selectGroups);
  const { handleDeleteGroup } = useDeleteGroup();

  const [creatingExpenseGroup, setCreatingExpenseGroup] = useState<number | null>(null);
  const [viewingGroupId, setViewingGroupId] = useState<number | null>(null);
  const [isCreatingGroup, setIsCreatingGroup] = useState<boolean>(false); // Modal State
  

  useEffect(() => {
    if (isSuccess && groups) {
      dispatch(setGroups(groups));
    }
  }, [isSuccess, groups, dispatch]);

 

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Groups List</h2>
      <button
        onClick={() => setIsCreatingGroup(true)}
        className="text-green-500 hover:text-green-700">
        Create Group
      </button>

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
      {isCreatingGroup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Create New Group</h3>
            <CreateGroup onClose={() => setIsCreatingGroup(false)} />
            <button
              onClick={() => setIsCreatingGroup(false)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupsList;