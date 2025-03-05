import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGroups, selectGroups } from "../../redux/slices/groupsslice";
import CreateGroup from "./creategroup";
import ErrorBoundary from "../../shared/ErrorBoundary";
import { useGetGroupsQuery } from "./groupApi";
import useDeleteGroup from "./deletegroup";
import GroupDetails from "./groupdetails";
import CreateExpense from "../transactions/expense";
import { Button } from "../../shared/components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../shared/components/table";

const GroupsList: React.FC = () => {
  const dispatch = useDispatch();
  const { data: groups, isSuccess } = useGetGroupsQuery();
  const storedGroups = useSelector(selectGroups);
  const { handleDeleteGroup } = useDeleteGroup();

  const [creatingExpenseGroup, setCreatingExpenseGroup] = useState<
    number | null
  >(null);
  const [viewingGroupId, setViewingGroupId] = useState<number | null>(null);
  const [isCreatingGroup, setIsCreatingGroup] = useState<boolean>(false); // Modal State

  useEffect(() => {
    if (isSuccess && groups) {
      dispatch(setGroups(groups));
    }
  }, [isSuccess, groups, dispatch]);

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('src/assets/images/bg.jpg')",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(255, 255, 255, 0.65)",
      }}
    >
      <div className="relative w-[1400px] h-[700px] bg-white rounded-3xl shadow-xl overflow-hidden flex gap-x-24 -mt-6">
        <div className="absolute top-[5%] left-[5%] flex items-center gap-4">
          <h2 className="absolute top-4 left-6 text-2xl font-bold text-gray-800">
            Groups
          </h2>
        </div>
          <div className="absolute top-[8%] right-[6%] flex items-center gap-4">
            <div className="w-[2px] h-8 bg-gray-300"></div>
            <Button variant="outline" onClick={() => setIsCreatingGroup(true)}>
              Create Group
            </Button>
          </div>
          <hr></hr>

        <div className=" absolute top-[15%] flex justify-center items-center gap-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead> Group Name</TableHead>
                <TableHead> Group Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {storedGroups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell>{group.name}</TableCell>
                  <TableCell>{group.description}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      className="text-green-600 hover:bg-green-100"
                      onClick={() => setCreatingExpenseGroup(group.id)}
                    >
                      Add Expense
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-blue-600 hover:bg-blue-100"
                      onClick={() => setViewingGroupId(group.id)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-red-600 hover:bg-red-100"
                      onClick={() => handleDeleteGroup(group.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Create Expense Modal */}
          {creatingExpenseGroup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg">
                <CreateExpense
                  groupId={creatingExpenseGroup}
                  onClose={() => setCreatingExpenseGroup(null)}
                />
              </div>
            </div>
          )}

          {/* View Group Details Modal */}
          {viewingGroupId && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg">
                <ErrorBoundary>
                  <GroupDetails
                    groupId={viewingGroupId}
                    onClose={() => setViewingGroupId(null)}
                  />
                </ErrorBoundary>
              </div>
            </div>
          )}

          {/* Create Group Modal */}
          {isCreatingGroup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-lg font-semibold mb-4">Create New Group</h3>
                <CreateGroup onClose={() => setIsCreatingGroup(false)} />
                <Button
                  className="mt-4 bg-gray-500 hover:bg-gray-700 text-white"
                  onClick={() => setIsCreatingGroup(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupsList;
