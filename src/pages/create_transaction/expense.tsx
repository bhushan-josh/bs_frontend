import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/slices/userslice";
import { useCreateExpenseMutation } from "./expenseApi";

const CreateExpense = ({ group, onClose }) => {
  // Validate group and group.group_members
  if (!group || !group.group_members) {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Create Expense</h2>
        <p className="text-red-500">Invalid group data. Please try again.</p>
        <button onClick={onClose} className="mt-4 p-2 bg-gray-500 text-white rounded w-full">
          Close
        </button>
      </div>
    );
  }

  // Fetch users from the Redux store
  const users = useSelector(selectUsers);

  // Filter group members
  const groupMembers = users.filter((user) =>
    group.group_members.some((member) => member.member_id === user.id)
  );

  // State for form inputs
  const [payerId, setPayerId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [splitType, setSplitType] = useState("equal"); // "equal" or "manual"
  const [manualSplits, setManualSplits] = useState([]); // For manual split

  // Mutation for creating an expense
  const [createExpense] = useCreateExpenseMutation();

  // Handle form submission
  const handleSubmit = async () => {
    if (!payerId || !amount || !description) {
      alert("Please fill all required fields.");
      return;
    }

    // Prepare expense_splits_attributes
    let expenseSplits;
    if (splitType === "equal") {
      // Split equally among all group members except the payer
      const payees = groupMembers.filter((member) => member.id !== payerId);
      const splitAmount = (amount / payees.length).toFixed(2);
      expenseSplits = payees.map((member) => ({
        payer_id: payerId,
        payee_id: member.id,
        amount: splitAmount,
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
      group_id: group.id,
      amount: parseFloat(amount),
      description,
      expense_splits_attributes: expenseSplits,
    };

    console.log("Payload:", payload); // Debugging

    try {
      // Send the request to the API
      const result = await createExpense(payload).unwrap();
      console.log("Expense created successfully:", result); // Debugging
      alert("Expense created successfully!");
      onClose(); // Close the modal
    } catch (error) {
      console.error("Failed to create expense:", error); // Debugging
      alert("Failed to create expense. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create Expense</h2>

      {/* Payer Selection */}
      <label className="block">Payer:</label>
      <select
        value={payerId}
        onChange={(e) => setPayerId(e.target.value)}
        className="w-full p-2 border mb-2"
      >
        <option value="">Select Payer</option>
        {groupMembers.map((user) => (
          <option key={user.id} value={user.id}>
            {user.first_name} {user.last_name}
          </option>
        ))}
      </select>

      {/* Amount Input */}
      <label className="block">Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border mb-2"
      />

      {/* Description Input */}
      <label className="block">Description:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border mb-2"
      />

      {/* Split Type Selection */}
      <label className="block">Split Type:</label>
      <select
        value={splitType}
        onChange={(e) => setSplitType(e.target.value)}
        className="w-full p-2 border mb-2"
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
                onChange={(e) =>
                  setManualSplits((prev) => {
                    const updated = [...prev];
                    updated[index].payee_id = e.target.value;
                    return updated;
                  })
                }
                className="w-full p-2 border"
              >
                <option value="">Select Payee</option>
                {groupMembers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.first_name} {user.last_name}
                  </option>
                ))}
              </select>
              <label className="block">Amount:</label>
              <input
                type="number"
                value={split.amount}
                onChange={(e) =>
                  setManualSplits((prev) => {
                    const updated = [...prev];
                    updated[index].amount = e.target.value;
                    return updated;
                  })
                }
                className="w-full p-2 border mt-2"
              />
            </div>
          ))}
          <button
            onClick={() =>
              setManualSplits((prev) => [...prev, { payee_id: "", amount: "" }])
            }
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            Add Payee
          </button>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 p-2 bg-green-500 text-white rounded w-full"
      >
        Create Expense
      </button>
    </div>
  );
};

export default CreateExpense;