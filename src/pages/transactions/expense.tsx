import React, { useState } from "react";
import { toast } from "sonner";
import { useGetGroupQuery } from "../groups/groupApi";
import { useGetUsersQuery } from "../friends/usersApi";
import { useCreateExpenseMutation } from "./expenseApi";

interface CreateExpenseProps {
  groupId: number;
  onClose: () => void;
}

const CreateExpense: React.FC<CreateExpenseProps> = ({ groupId, onClose }) => {
  const { data: groupDetails, isLoading: isGroupLoading } = useGetGroupQuery(groupId);
  const { data: users = [] } = useGetUsersQuery();

  const getMemberName = (memberId: number) => {
    const user = users.find((user) => user.id === memberId);
    return user ? `${user.first_name} ${user.last_name}` : `User ${memberId}`;
  };

  const [payerId, setPayerId] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [splitType, setSplitType] = useState<"equal" | "manual">("equal");
  const [manualSplits, setManualSplits] = useState<{ payee_id: number; amount: number }[]>([]);

  const [createExpense, { isLoading: isCreating }] = useCreateExpenseMutation();

  const handleSubmit = async () => {
    if (!payerId || !amount || !description) {
      toast.error("Please fill all required fields.");
      return;
    }

    let expenseSplits;
    if (splitType === "equal") {
      const payees = groupDetails?.group_members.filter(member => member.member_id !== payerId) || [];
      const splitAmount = (amount / (payees.length + 1)).toFixed(2);
      expenseSplits = payees.map(member => ({
        payer_id: payerId,
        payee_id: member.member_id,
        amount: parseFloat(splitAmount),
        status: 0,
      }));
    } else {
      expenseSplits = manualSplits.map(split => ({
        payer_id: payerId,
        payee_id: split.payee_id,
        amount: split.amount,
        status: 0,
      }));
    }

    try {
      await createExpense({
        payer_id: payerId,
        group_id: groupId,
        amount,
        description,
        expense_splits_attributes: expenseSplits,
      }).unwrap();
      toast.success("Expense created successfully!");
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create expense.");
    }
  };

  const handleAddManualSplit = () => {
    setManualSplits([...manualSplits, { payee_id: 0, amount: 0 }]);
  };

  const handleManualSplitChange = (index: number, field: "payee_id" | "amount", value: number) => {
    const updatedSplits = [...manualSplits];
    updatedSplits[index][field] = value;
    setManualSplits(updatedSplits);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white shadow-2xl rounded-xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-5 border-b text-center">
          <h2 className="text-2xl font-bold text-gray-800">Create Expense</h2>
        </div>

        <div className="p-5 overflow-y-auto flex-1">
          <label className="block font-semibold text-gray-700 mb-2">Payer</label>
          <select
            value={payerId || ""}
            onChange={(e) => setPayerId(Number(e.target.value))}
            className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-400 focus:border-green-500 outline-none mb-4"
          >
            <option value="">Select Payer</option>
            {groupDetails?.group_members.map(member => (
              <option key={member.member_id} value={member.member_id}>
                {getMemberName(member.member_id)}
              </option>
            ))}
          </select>

          <label className="block font-semibold text-gray-700 mb-2">Amount</label>
          <input
            type="number"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-3 border rounded-lg mb-4"
          />

          <label className="block font-semibold text-gray-700 mb-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4"
          />

          <label className="block font-semibold text-gray-700 mb-2">Split Type</label>
          <select
            value={splitType}
            onChange={(e) => setSplitType(e.target.value as "equal" | "manual")}
            className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-400 focus:border-green-500 outline-none mb-4"
          >
            <option value="equal">Split Equally</option>
            <option value="manual">Manual Split</option>
          </select>

          {splitType === "manual" && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Manual Split</h3>
              <div className="space-y-3">
                {manualSplits.map((split, index) => (
                  <div key={index} className="p-3 bg-gray-100 rounded-lg shadow">
                    <label className="block font-medium text-gray-700 mb-1">Payee</label>
                    <select
                      value={split.payee_id}
                      onChange={(e) =>
                        handleManualSplitChange(index, "payee_id", Number(e.target.value))
                      }
                      className="w-full p-2 border rounded-lg mb-2"
                    >
                      <option value="">Select Payee</option>
                      {groupDetails?.group_members
                        .filter(member => member.member_id !== payerId)
                        .map(member => (
                          <option key={member.member_id} value={member.member_id}>
                            {getMemberName(member.member_id)}
                          </option>
                        ))}
                    </select>

                    <label className="block font-medium text-gray-700 mb-1">Amount</label>
                    <input
                      type="number"
                      value={split.amount}
                      onChange={(e) =>
                        handleManualSplitChange(index, "amount", Number(e.target.value))
                      }
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                ))}
              </div>
              <button onClick={handleAddManualSplit} className="mt-3 w-full p-3 bg-blue-500 text-white rounded-lg font-semibold">
                Add Payee
              </button>
            </div>
          )}
        </div>

        <div className="p-5 border-t flex justify-end space-x-3">
          <button onClick={onClose} className="p-3 bg-gray-500 text-white rounded-lg">Close</button>
          <button onClick={handleSubmit} disabled={isCreating} className="p-3 bg-green-500 text-white rounded-lg">
            {isCreating ? "Creating..." : "Create Expense"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateExpense;
