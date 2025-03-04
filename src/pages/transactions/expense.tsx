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
  // Fetch group details
  const {
    data: groupDetails,
    isLoading: isGroupLoading,
    isError: isGroupError,
    error: groupError,
  } = useGetGroupQuery(groupId);

  // Fetch all users
  const {
    data: users = [],
    isLoading: isUsersLoading,
    isError: isUsersError,
    error: usersError,
  } = useGetUsersQuery();

  // Map group members to their user details
  const getMemberName = (memberId: number) => {
    const user = users.find((user) => user.id === memberId);
    return user ? `${user.first_name} ${user.last_name}` : `User ${memberId}`;
  };

  // State for form inputs
  const [payerId, setPayerId] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [splitType, setSplitType] = useState<"equal" | "manual">("equal");
  const [manualSplits, setManualSplits] = useState<{ payee_id: number; amount: number }[]>([]);

  // Create expense mutation
  const [createExpense, { isLoading: isCreating }] = useCreateExpenseMutation();

  // Handle form submission
  const handleSubmit = async () => {
    if (!payerId || !amount || !description) {
      toast.error("Please fill all required fields.");
      return;
    }

    // Prepare expense_splits_attributes
    let expenseSplits;
    if (splitType === "equal") {
      // Split equally among all group members except the payer
      const payees = groupDetails?.group_members.filter((member) => member.member_id !== payerId) || [];
      const splitAmount = (amount / (payees.length+1)).toFixed(2);
      expenseSplits = payees.map((member) => ({
        payer_id: payerId,
        payee_id: member.member_id,
        amount: parseFloat(splitAmount),
        status: 0,
      }));
    } else {
      // Use manual splits
      expenseSplits = manualSplits.map((split) => ({
        payer_id: payerId,
        payee_id: split.payee_id,
        amount: split.amount,
        status: 0,
      }));
    }

    // Prepare the payload
    const payload = {
      payer_id: payerId,
      group_id: groupId,
      amount,
      description,
      expense_splits_attributes: expenseSplits,
    };

    console.log("Payload sent to API:", JSON.stringify(payload, null, 2));

    try {
      await createExpense(payload).unwrap();
      toast.success("Expense created successfully!");
      onClose(); // Close the modal after successful creation
    } catch (error: any) {
      console.error("Error creating expense:", error);
      toast.error(error?.data?.message || "Failed to create expense.");
    }
  };

  // Handle adding a manual split
  const handleAddManualSplit = () => {
    setManualSplits([...manualSplits, { payee_id: 0, amount: 0 }]);
  };

  // Handle updating a manual split
  const handleManualSplitChange = (index: number, field: "payee_id" | "amount", value: number) => {
    const updatedSplits = [...manualSplits];
    updatedSplits[index][field] = value;
    setManualSplits(updatedSplits);
  };

  if (isGroupLoading || isUsersLoading) {
    return <p className="text-gray-500">Loading group details...</p>;
  }

  if (isGroupError || isUsersError) {
    return (
      <p className="text-red-500">
        Error loading data: {groupError?.message || usersError?.message || "Unknown error"}
      </p>
    );
  }

  if (!groupDetails) {
    return <p className="text-gray-500">No group data available.</p>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create Expense</h2>

      {/* Payer Selection */}
      <label className="block">Payer:</label>
      <select
        value={payerId || ""}
        onChange={(e) => setPayerId(Number(e.target.value))}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="">Select Payer</option>
        {groupDetails.group_members.map((member) => (
          <option key={member.member_id} value={member.member_id}>
            {getMemberName(member.member_id)}
          </option>
        ))}
      </select>

      {/* Amount Input */}
      <label className="block">Amount:</label>
      <input
        type="number"
        value={amount || ""}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter amount"
        className="w-full p-2 border rounded mb-2"
      />

      {/* Description Input */}
      <label className="block">Description:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description"
        className="w-full p-2 border rounded mb-2"
      />

      {/* Split Type Toggle */}
      <label className="block">Split Type:</label>
      <select
        value={splitType}
        onChange={(e) => setSplitType(e.target.value as "equal" | "manual")}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="equal">Split Equally</option>
        <option value="manual">Manual Split</option>
      </select>

      {/* Manual Split Fields */}
      {splitType === "manual" && (
        <div>
          {manualSplits.map((split, index) => (
            <div key={index} className="mb-2">
              <label className="block">Payee:</label>
              <select
                value={split.payee_id}
                onChange={(e) => handleManualSplitChange(index, "payee_id", Number(e.target.value))}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Payee</option>
                {groupDetails.group_members
                  .filter((member) => member.member_id !== payerId) // Exclude the payer
                  .map((member) => (
                    <option key={member.member_id} value={member.member_id}>
                      {getMemberName(member.member_id)}
                    </option>
                  ))}
              </select>
              <label className="block">Amount:</label>
              <input
                type="number"
                value={split.amount}
                onChange={(e) => handleManualSplitChange(index, "amount", Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
          <button
            onClick={handleAddManualSplit}
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            Add Payee
          </button>
        </div>
      )}

      {/* Submit and Close Buttons */}
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={onClose}
          className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Close
        </button>
        <button
          onClick={handleSubmit}
          disabled={isCreating}
          className={`p-2 text-white rounded ${isCreating ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
        >
          {isCreating ? "Creating..." : "Create Expense"}
        </button>
      </div>
    </div>
  );
};

export default CreateExpense;