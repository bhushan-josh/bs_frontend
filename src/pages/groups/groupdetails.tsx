import React from "react";
import { useGetGroupQuery } from "./groupApi";

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
  console.log("Group ID in GroupDetails:", groupId); // Debugging

  // Fetch group details using the groupId
  const {
    data: groupDetails,
    isLoading,
    isError,
    error,
  } = useGetGroupQuery(groupId);

  console.log("Group Details Response:", groupDetails); // Debugging
  console.log("Error:", error); // Debugging

  if (isLoading) {
    return <p className="text-gray-500">Loading group details...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Error loading group details: {error?.message}</p>;
  }

  if (!groupDetails) {
    return <p className="text-gray-500">No group data available.</p>;
  }

  const group = groupDetails;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Group Details</h2>
      <p><strong>Name:</strong> {group.name}</p>
      <p><strong>Description:</strong> {group.description}</p>
      <p><strong>Creator ID:</strong> {group.creator_id}</p>
      <h3 className="text-lg font-bold mt-4">Members:</h3>
      {group.group_members && group.group_members.length > 0 ? (
        <ul>
          {group.group_members.map((member) => (
            <li key={member.id}>
              <strong>Member ID:</strong> {member.member_id}, <strong>Role:</strong> {member.role}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No members available.</p>
      )}
      <button
        onClick={onClose}
        className="mt-4 p-2 bg-gray-500 text-white rounded w-full"
      >
        Close
      </button>
    </div>
  );
};

export default GroupDetails;