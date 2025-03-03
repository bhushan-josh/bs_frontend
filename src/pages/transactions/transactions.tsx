import { useGetUsersQuery } from "../friends/usersApi";
import { useGetExpensesQuery, useGetSettlementsQuery } from "./transactinsApi";

const Transactions = () => {
  const { data: expenses, error: expensesError, isLoading: expensesLoading } = useGetExpensesQuery();
  const { data: settlements, error: settlementsError, isLoading: settlementsLoading } = useGetSettlementsQuery();
  const { data: users, error: usersError, isLoading: usersLoading } = useGetUsersQuery();

  if (expensesLoading || settlementsLoading || usersLoading) return <p>Loading...</p>;
  if (expensesError || settlementsError || usersError) return <p className="text-red-500">Error fetching data</p>;

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
                Payer: {usersMap?.[expense.payer_id] || "Unknown"},Payee: {usersMap?.[expense.payee_id] || "Unknown"} Amount: {expense.amount}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No expenses available.</p>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Settlements</h3>
        {settlements && settlements.length > 0 ? (
          <ul>
            {settlements.map((settlement) => (
              <li key={settlement.id} className="p-2 border-b">
                Payer: {usersMap?.[settlement.payer_id] || "Unknown"},
                Payee: {usersMap?.[settlement.payee_id] || "Unknown"},
                Amount: {settlement.amount}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No settlements available.</p>
        )}
      </div>
    </div>
  );
};

export default Transactions;
