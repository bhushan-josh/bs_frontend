import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGroups, selectGroups } from "../../redux/slices/groupsslice";
import CreateGroup from "./creategroup";
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
import { IconX } from "@tabler/icons-react";

const GroupsList: React.FC = () => {
  const dispatch = useDispatch();
  const { data: groups, isSuccess } = useGetGroupsQuery();
  const storedGroups = useSelector(selectGroups);
  const { handleDeleteGroup } = useDeleteGroup();

  const [creatingExpenseGroup, setCreatingExpenseGroup] = useState<
    number | null
  >(null);
  const [viewingGroupId, setViewingGroupId] = useState<number | null>(null);
  const [isCreatingGroup, setIsCreatingGroup] = useState<boolean>(false);

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
      <div className="absolute left-[20%] transform -translate-x-1/2 top-[5%] text-4xl font-bold font-[Arial] text-gray-400">
        billsplitter
      </div>

      <div className="relative w-[1400px] h-[700px] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col -mt-6 p-8">
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Groups</h2>
        <div className="flex items-center gap-4">
          <div className="w-[1px] h-8 bg-gray-300"></div>
          <Button
            variant="link"
            className="text-lg px-4 py-2"
            onClick={() => setIsCreatingGroup(true)}
          >
            Create Group
          </Button>
        </div>
      </div>
  
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg">Group Name</TableHead>
              <TableHead className="text-lg">Group Description</TableHead>
              <TableHead className="text-lg text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {storedGroups.map((group) => (
              <TableRow key={group.id}>
                <TableCell className="text-lg capitalize">{group.name}</TableCell>
                <TableCell className="text-lg">{group.description}</TableCell>
                <TableCell className="text-lg text-right space-x-2">
                  <Button
                    variant="ghost"
                    className="text-base text-green-600 hover:bg-green-100"
                    onClick={() => setCreatingExpenseGroup(group.id)}
                  >
                    Add Expense
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-base text-blue-600 hover:bg-blue-100"
                    onClick={() => setViewingGroupId(group.id)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-base text-red-600 hover:bg-red-100"
                    onClick={() => handleDeleteGroup(group.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
  
      {/* Modals */}
      {creatingExpenseGroup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
            <CreateExpense
              groupId={creatingExpenseGroup}
              onClose={() => setCreatingExpenseGroup(null)}
            />
          </div>
        </div>
      )}
  
      {viewingGroupId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
            <GroupDetails
              groupId={viewingGroupId}
              onClose={() => setViewingGroupId(null)}
            />
          </div>
        </div>
      )}
  
      {isCreatingGroup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
            {/* Close Button */}
            <div className="flex justify-end mb-4">
              <button
                className="p-2 text-gray-800 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                onClick={() => setIsCreatingGroup(false)}
              >
                <IconX />
              </button>
            </div>
  
            {/* Create Group Form */}
            <CreateGroup onClose={() => setIsCreatingGroup(false)} />
          </div>
        </div>
      )}
    </div>
  </div>
  
  );
};

export default GroupsList;
