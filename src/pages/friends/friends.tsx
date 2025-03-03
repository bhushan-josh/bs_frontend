import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/slices/userslice";
import { useGetBalanceQuery } from "./balanceApi";

const UsersList = () => {
  const users = useSelector(selectUsers) || [];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>

      {/* Users List */}
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => {
            if (!user?.id) return null; // Ensure user has an id before calling API

            const { data: balanceData, error, isFetching } = useGetBalanceQuery(user.id);

            return (
              <li key={user.id} className="p-3 bg-white rounded-lg shadow-md">
                <p className="text-lg font-semibold">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-gray-500">{user.email}</p>
                <p className="text-blue-600">
                  Balance: {error ? (
                    "Error loading balance"
                  ) : isFetching ? (
                    "Loading..."
                  ) : (
                    `${balanceData?.balance ?? 0} INR`
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default UsersList;
