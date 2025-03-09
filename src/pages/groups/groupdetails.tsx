import React from "react";
import { useGetGroupQuery } from "./groupApi";
import { useGetUsersQuery } from "../friends/usersApi";

interface GroupMember {
  id: number;
  member_id: number;
  role: string;
}

interface Group {
  id: number;
  name: string;
  description: string;
  creator_id: number;
  group_members?: GroupMember[];
}

interface GroupDetailsProps {
  groupId: number;
  onClose: () => void;
}

const GroupDetails: React.FC<GroupDetailsProps> = ({ groupId, onClose }) => {
  const {
    data: groupDetails,
    isLoading: isGroupLoading,
    isError: isGroupError,
    error: groupError,
  } = useGetGroupQuery(groupId);

  const {
    data: users = [],
    isLoading: isUsersLoading,
    isError: isUsersError,
    error: usersError,
  } = useGetUsersQuery();

  if (isGroupLoading || isUsersLoading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (isGroupError || isUsersError) {
    return (
      <p className="text-red-500">
        Error: {groupError?.message || usersError?.message}
      </p>
    );
  }

  if (!groupDetails) {
    return <p className="text-gray-500">No group data available.</p>;
  }

  const group = groupDetails;

  return (
    <div className="p-8 bg-white shadow-2xl rounded-xl max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Group Details
      </h2>

      {/* Group Name */}
      <p className="text-gray-800 mb-3">
        <strong className="font-semibold">Name:</strong> {group.name}
      </p>

      {/* Group Description */}
      <p className="text-gray-800 mb-3">
        <strong className="font-semibold">Description:</strong>{" "}
        {group.description}
      </p>

      {/* Members List */}
      <h3 className="text-lg font-bold text-gray-700 mt-4 mb-2">Members</h3>
      {group.group_members && group.group_members.length > 0 ? (
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {group.group_members.map((member) => {
            const user = users.find((u) => u.id === member.member_id);
            return (
              <div
                key={member.id}
                className="flex justify-between items-center bg-gray-100 p-2 rounded-lg shadow"
              >
                <span className="text-gray-800">
                  <strong className="font-semibold">Member:</strong>{" "}
                  {user
                    ? `${user.first_name} ${user.last_name}`
                    : `User ID: ${member.member_id}`}
                </span>
                <span className="text-gray-600">
                  <strong className="font-semibold">Role:</strong> {member.role}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">No members available.</p>
      )}

      {/* Close Button */}
      <button
        onClick={onClose}
        className="mt-6 w-full text-white p-3 rounded-lg font-semibold transition-all bg-gray-500 hover:bg-gray-600"
      >
        Close
      </button>
    </div>
  );
};

export default GroupDetails;
