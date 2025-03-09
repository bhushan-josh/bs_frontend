import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/slices/userslice";
import { toast } from "sonner";
import { RootState } from "../../redux/store";
import { useSettleBalanceMutation } from "../transactions/settlementApi";
import {
  useCreateExpenseSplitMutation,
  useGetBalanceQuery,
} from "../transactions/expenseApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../shared/components/table";
import { Button } from "../../shared/components/button";

const UsersList = () => {
  const users = useSelector(selectUsers) || [];
  const [settleBalance] = useSettleBalanceMutation();
  const [createExpense] = useCreateExpenseSplitMutation();
  const currentUser = useSelector((state: RootState) => state.auth.userData);

  const [isSettleModalOpen, setIsSettleModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: number;
    balance: number;
  } | null>(null);
  const [amount, setAmount] = useState<number>(0);

  const {
    data: balanceData,
    error,
    isFetching,
    refetch,
  } = useGetBalanceQuery(selectedUser?.id || 0, {
    skip: !selectedUser,
  });

  const handleSettleClick = (userId: number) => {
    setSelectedUser({ id: userId, balance: balanceData?.balance || 0 });
    setIsSettleModalOpen(true);
  };

  const handleExpenseClick = (userId: number) => {
    setSelectedUser({ id: userId, balance: balanceData?.balance || 0 });
    setIsExpenseModalOpen(true);
  };

  const handleConfirmSettle = async () => {
    if (!selectedUser) return;

    try {
      const payload = { payee_id: selectedUser.id };
      await settleBalance(payload).unwrap();
      toast.success("Settlement successful!");
      setIsSettleModalOpen(false);
      refetch();
    } catch (error: any) {
      console.error("Error settling balance:", error);
      toast.error(error?.data?.message || "Failed to settle balance.");
    }
  };

  const handleConfirmExpense = async () => {
    if (!selectedUser || amount <= 0) return;

    try {
      const payload = {
        payer_id: currentUser.id,
        payee_id: selectedUser.id,
        amount: amount,
      };
      await createExpense(payload).unwrap();
      toast.success("Expense created successfully!");
      setIsExpenseModalOpen(false);
      refetch();
    } catch (error: any) {
      console.error("Error creating expense:", error);
      toast.error(error?.data?.message || "Failed to create expense.");
    }
  };

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
          <h2 className="text-2xl font-bold text-gray-800">Friends</h2>
        </div>
        {users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg">Name</TableHead>
            <TableHead className="text-lg">Email</TableHead>
            <TableHead className="text-lg">Balance</TableHead>
            <TableHead className="text-lg text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            if (!user?.id) return null;

            const {
              data: balanceData,
              error,
              isFetching,
            } = useGetBalanceQuery(user.id);

            return (
              <TableRow key={user.id}>
                <TableCell className="text-lg">
                  <div className="capitalize">
                    {user.first_name} {user.last_name}
                  </div>
                </TableCell>
                <TableCell className="text-lg">{user.email}</TableCell>
                <TableCell className="text-lg text-blue-600">
                  {error
                    ? "Error loading balance"
                    : isFetching
                    ? "Loading..."
                    : `${balanceData?.balance ?? 0} INR`}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    onClick={() => handleSettleClick(user.id)}
                    variant="ghost"
                    className="text-base text-green-600 hover:bg-green-100"
                  >
                    Settle
                  </Button>
                  <Button
                    onClick={() => handleExpenseClick(user.id)}
                    variant="ghost"
                    className="text-base text-red-600 hover:bg-red-100"
                  >
                    Expense
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
        )}

        {isSettleModalOpen && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg relative">
              <h2 className="text-xl font-bold mb-4">Confirm Settlement</h2>
              <p className="text-gray-700">
                Are you sure you want to settle the balance with{" "}
                <span className="font-semibold capitalize">
                  {users.find((u) => u.id === selectedUser.id)?.first_name}{" "}
                  {users.find((u) => u.id === selectedUser.id)?.last_name}
                </span>
                ?
              </p>
              <p className="text-blue-600 mt-2">
                Current Balance:{" "}
                {error
                  ? "Error loading balance"
                  : isFetching
                  ? "Loading..."
                  : `${balanceData?.balance ?? 0} INR`}
              </p>
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  onClick={() => setIsSettleModalOpen(false)}
                  variant="link"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmSettle}
                  className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}

        {isExpenseModalOpen && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg relative">
              <h2 className="text-xl font-bold mb-4">Create Expense</h2>
              <p className="text-gray-700">
                Create an expense with{" "}
                <span className="font-semibold capitalize">
                  {users.find((u) => u.id === selectedUser.id)?.first_name}{" "}
                  {users.find((u) => u.id === selectedUser.id)?.last_name}
                </span>
                ?
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
                <Button
                  onClick={() => setIsExpenseModalOpen(false)}
                  variant="link"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmExpense}
                  className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Create Expense
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
