import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/slices/userslice";
import { useGetBalanceQuery } from "./balanceApi";
import { toast } from "sonner";
import { useSettleBalanceMutation } from "../transactions/settlementApi";
import { useCreateExpenseMutation } from "./expenseu2uApi";
import { RootState } from "../../redux/store";

const UsersList = () => {
  const users = useSelector(selectUsers) || [];
  const [settleBalance] = useSettleBalanceMutation();
  const [createExpense] = useCreateExpenseMutation();
  const currentUser = useSelector((state: RootState) => state.auth.userData); // Get current user from Redux

  // State for the settlement modal
  const [isSettleModalOpen, setIsSettleModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ id: number; balance: number } | null>(null);
  const [amount, setAmount] = useState<number>(0);

  // Fetch balance for each user
  const userBalances = users.map((user) => {
    const { data: balanceData, error, isFetching, refetch } = useGetBalanceQuery(user.id);
    return { userId: user.id, balanceData, error, isFetching, refetch };
  });

  // Refetch all balances when the component mounts
  useEffect(() => {
    userBalances.forEach((balance) => balance.refetch());
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handle the "Settle" button click
  const handleSettleClick = (userId: number) => {
    const selectedBalance = userBalances.find((balance) => balance.userId === userId);
    setSelectedUser({ id: userId, balance: selectedBalance?.balanceData?.balance || 0 });
    setIsSettleModalOpen(true);
  };

  // Handle the "Expense" button click
  const handleExpenseClick = (userId: number) => {
    const selectedBalance = userBalances.find((balance) => balance.userId === userId);
    setSelectedUser({ id: userId, balance: selectedBalance?.balanceData?.balance || 0 });
    setIsExpenseModalOpen(true);
  };

  // Handle the settlement confirmation
  const handleConfirmSettle = async () => {
    if (!selectedUser) return;

    try {
      const payload = { payee_id: selectedUser.id };
      await settleBalance(payload).unwrap();
      toast.success("Settlement successful!");
      setIsSettleModalOpen(false); // Close the modal after successful settlement
      userBalances.forEach((balance) => balance.refetch()); // Refetch all balances
    } catch (error: any) {
      console.error("Error settling balance:", error);
      toast.error(error?.data?.message || "Failed to settle balance.");
    }
  };

  // Handle the expense creation
  const handleConfirmExpense = async () => {
    if (!selectedUser || amount <= 0) return;

    try {
      const payload = {
        payer_id: currentUser.id, // Assuming currentUser is available in your context
        payee_id: selectedUser.id,
        amount: amount,
      };
      await createExpense(payload).unwrap();
      toast.success("Expense created successfully!");
      setIsExpenseModalOpen(false); // Close the modal after successful expense creation
      userBalances.forEach((balance) => balance.refetch()); // Refetch all balances
    } catch (error: any) {
      console.error("Error creating expense:", error);
      toast.error(error?.data?.message || "Failed to create expense.");
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

            const userBalance = userBalances.find((balance) => balance.userId === user.id);

            return (
              <li key={user.id} className="p-3 bg-white rounded-lg shadow-md">
                <p className="text-lg font-semibold">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-gray-500">{user.email}</p>
                <p className="text-blue-600">
                  Balance: {userBalance?.error ? (
                    "Error loading balance"
                  ) : userBalance?.isFetching ? (
                    "Loading..."
                  ) : (
                    `${userBalance?.balanceData?.balance ?? 0} INR`
                  )}
                </p>
                <button
                  onClick={() => handleSettleClick(user.id)}
                  className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Settle
                </button>
                <button
                  onClick={() => handleExpenseClick(user.id)}
                  className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Expense
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Settlement Confirmation Modal */}
      {isSettleModalOpen && selectedUser && (
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
              Current Balance: {userBalances.find((balance) => balance.userId === selectedUser.id)?.error ? (
                "Error loading balance"
              ) : userBalances.find((balance) => balance.userId === selectedUser.id)?.isFetching ? (
                "Loading..."
              ) : (
                `${userBalances.find((balance) => balance.userId === selectedUser.id)?.balanceData?.balance ?? 0} INR`
              )}
            </p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsSettleModalOpen(false)}
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

      {/* Expense Creation Modal */}
      {isExpenseModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Create Expense</h2>
            <p className="text-gray-700">
              Create an expense with{" "}
              <span className="font-semibold">
                {users.find((u) => u.id === selectedUser.id)?.first_name}{" "}
                {users.find((u) => u.id === selectedUser.id)?.last_name}
              </span>?
            </p>
            <div className="mt-4">
              <label className="block text-gray-700">Amount (INR)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter amount"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsExpenseModalOpen(false)}
                className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmExpense}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Create Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;