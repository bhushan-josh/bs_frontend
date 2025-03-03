import { useSelector } from "react-redux";
import { useState } from "react";
import { selectUsers } from "../../redux/slices/userslice";

const UsersList = () => {
  const users = useSelector(selectUsers);
  const [search, setSearch] = useState("");

  // Filter users based on search input
  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded-full"
      />

      {/* Users List */}
      {filteredUsers.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <ul className="space-y-2">
          {filteredUsers.map((user) => (
            <li key={user.id} className="p-3 bg-white rounded-lg shadow-md">
              <p className="text-lg font-semibold">{user.first_name} {user.last_name}</p>
              <p className="text-gray-500">{user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersList;
