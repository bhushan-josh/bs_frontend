import { useGetUsersQuery } from "../friends/usersApi";
import { useGetSettlementsQuery } from "./settlementApi";

const SettlementList = () => {
  const { data: settlements, error: settlementsError, isLoading: settlementsLoading } = useGetSettlementsQuery();
  const { data: users, error: usersError, isLoading: usersLoading } = useGetUsersQuery();

  if (settlementsLoading || usersLoading) return <p>Loading...</p>;
  if (settlementsError || usersError) return <p className="text-red-500">Error fetching data</p>;

  const usersMap = users?.reduce((acc, user) => {
    acc[user.id] = `${user.first_name} ${user.last_name}`.trim(); 
    return acc;
  }, {} as Record<number, string>);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <div>
        <h3 className="text-xl font-semibold mb-2">Settlements</h3>
        {settlements && settlements.length > 0 ? (
          <ul>
            {settlements.map((settlement) => (
              <li key={settlement.id} className="p-2 border-b">
                <strong>
                  {usersMap?.[settlement.payer_id] || "Unknown"}{" "}
                  </strong>
                settled ₹{settlement.amount} with <strong>you</strong>
                <br></br>
                <small>
                  Time: {settlement.created_at}
                  </small>
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

export default SettlementList;