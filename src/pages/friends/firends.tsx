import { useGetUsersQuery } from "./usersApi";

const UsersList = () => {
  const { data: users, error, isLoading } = useGetUsersQuery(); 

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error fetching users</p>;

  if (!users || users.length === 0) {
    return <p className="text-gray-500">No users available.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="p-2 border-b">{user.first_name} {user.last_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
