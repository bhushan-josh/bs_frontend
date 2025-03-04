
import { useGetUsersQuery } from "../friends/usersApi";
import { useGetExpensesQuery } from "./expenseApi";

const ExpenseList = () => {
  const { data: expenses, error: expensesError, isLoading: expensesLoading } = useGetExpensesQuery();
  const { data: users, error: usersError, isLoading: usersLoading } = useGetUsersQuery();

  if (expensesLoading || usersLoading) return <p>Loading...</p>;
  if (expensesError || usersError) return <p className="text-red-500">Error fetching data</p>;

  const usersMap = users?.reduce((acc, user) => {
    acc[user.id] = `${user.first_name} ${user.last_name}`.trim(); 
    return acc;
  }, {} as Record<number, string>);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Expenses</h3>
        {expenses && expenses.length > 0 ? (
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id} className="p-2 border-b">
                <strong>{usersMap?.[expense.payer_id] || "Unknown"}</strong>
                {" "}
                paid <strong> ₹{expense.amount}</strong> to <strong>{usersMap?.[expense.payee_id] || "Unknown"}</strong>
                <br></br><small>
                  {expense.created_at}
                  </small>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No expenses available.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;