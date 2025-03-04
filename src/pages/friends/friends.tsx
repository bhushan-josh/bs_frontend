import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/slices/userslice";
import { useGetBalanceQuery } from "./balanceApi";
import { toast } from "sonner";
import { useSettleBalanceMutation } from "../create_transaction/settlementApi";

const UsersList = () => {
  const users = useSelector(selectUsers) || [];
  const [settleBalance] = useSettleBalanceMutation();

  // State for the settlement modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ id: number; balance: number } | null>(null);

  // Fetch balance for the selected user
  const { data: balanceData, error, isFetching } = useGetBalanceQuery(selectedUser?.id || 0, {
    skip: !selectedUser, // Skip the query if no user is selected
  });

  // Handle the "Settle" button click
  const handleSettleClick = (userId: number) => {
    setSelectedUser({ id: userId, balance: balanceData?.balance || 0 });
    setIsModalOpen(true);
  };

  // Handle the settlement confirmation
  const handleConfirmSettle = async () => {
    if (!selectedUser) return;

    try {
      const payload = { payee_id: selectedUser.id };
      await settleBalance(payload).unwrap();
      toast.success("Settlement successful!");
      setIsModalOpen(false); // Close the modal after successful settlement
    } catch (error: any) {
      console.error("Error settling balance:", error);
      toast.error(error?.data?.message || "Failed to settle balance.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>

      {/* Users List */}
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => {
            if (!user?.id) return null; // Ensure user has an ID before calling API

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
                <button
                  onClick={() => handleSettleClick(user.id)}
                  className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Settle
                </button>
                <button
                  onClick={() => handleSettleClick(user.id)}
                  className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Expense
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Settlement Confirmation Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Settlement</h2>
            <p className="text-gray-700">
              Are you sure you want to settle the balance with{" "}
              <span className="font-semibold">
                {users.find((u) => u.id === selectedUser.id)?.first_name}{" "}
                {users.find((u) => u.id === selectedUser.id)?.last_name}
              </span>?
            </p>
            <p className="text-blue-600 mt-2">
              Current Balance: {error ? (
                "Error loading balance"
              ) : isFetching ? (
                "Loading..."
              ) : (
                `${balanceData?.balance ?? 0} INR`
              )}
            </p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSettle}
                className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;