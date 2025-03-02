import { useGetExpensesQuery, useGetSettlementsQuery } from "./transactinsApi";

const Transactions = () => {
  const { data: expenses, error: expensesError, isLoading: expensesLoading } = useGetExpensesQuery();
  const { data: settlements, error: settlementsError, isLoading: settlementsLoading } = useGetSettlementsQuery();

  if (expensesLoading || settlementsLoading) return <p>Loading...</p>;
  if (expensesError || settlementsError) return <p className="text-red-500">Error fetching transactions</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4"> Transactions </h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Expenses</h3>
        {expenses && expenses.length > 0 ? (
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id} className="p-2 border-b">
                Payer: {expense.payer_id}, Amount: {expense.amount}
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
                Payer: {settlement.payer_id}, Payee: {settlement.payee_id}, Amount: {settlement.amount}
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
