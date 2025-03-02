import { useGetGroupsQuery } from "./groupApi";

const GroupsList = () => {
  const { data: groups, error, isLoading } = useGetGroupsQuery(); 

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error fetching groups</p>;

  if (!groups || groups.length === 0) {
    return <p className="text-gray-500">No groups available.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Groups List</h2>
      <ul>
        {groups.map((group) => (
          <li key={group.id} className="p-2 border-b">{group.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GroupsList;
