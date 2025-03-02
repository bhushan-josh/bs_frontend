import { useGetSettlementsQuery } from "./transactinsApi"

const Settlements = () => {
  const { data: settlements, error, isLoading } = useGetSettlementsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error fetching Settlements</p>;

  if (!settlements || settlements.length === 0) {
    return <p className="text-gray-500">No transactions available.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4"> Settlements List </h2>
      <ul>
        {settlements.map((settlement) => (
          <li key={settlement.id} className="p-2 border-b"> {settlement.payer_id} {settlement.payee_id} {settlement.amount}  </li>
        ))}
      </ul>
    </div>
  );
};

export default Settlements
