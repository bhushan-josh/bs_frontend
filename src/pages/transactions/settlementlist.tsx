import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../shared/components/table";
import { useGetUsersQuery } from "../friends/usersApi";
import { useGetSettlementsQuery } from "./settlementApi";

const SettlementList = () => {
  const {
    data: settlements,
    error: settlementsError,
    isLoading: settlementsLoading,
  } = useGetSettlementsQuery();
  const {
    data: users,
    error: usersError,
    isLoading: usersLoading,
  } = useGetUsersQuery();

  if (settlementsLoading || usersLoading)
    return <p className="text-lg text-gray-600 text-center">Loading...</p>;
  if (settlementsError || usersError)
    return <p className="text-lg text-red-500 text-center">Error fetching data</p>;

  const usersMap = users?.reduce((acc, user) => {
    acc[user.id] = `${user.first_name} ${user.last_name}`.trim();
    return acc;
  }, {} as Record<number, string>);

  return (
    <div className="w-full overflow-x-auto max-h-[32rem]">
      {settlements && settlements.length > 0 ? (
        <Table className="w-full text-lg">
          <TableHeader>
            <TableRow className="text-lg">
              <TableHead className="p-4">Payer</TableHead>
              <TableHead className="p-4">Payee</TableHead>
              <TableHead className="p-4">Amount</TableHead>
              <TableHead className="p-4">Time</TableHead>
              <TableHead className="p-4">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {settlements.map((settlement) => (
              <TableRow
                key={settlement.id}
                className="hover:bg-gray-50 transition"
              >
                <TableCell className="p-4 font-medium">
                  {usersMap?.[settlement.payer_id] || "Unknown"}
                </TableCell>
                <TableCell className="p-4 font-medium">
                  {usersMap?.[settlement.payee_id] || "Unknown"}
                </TableCell>
                <TableCell className="p-4 font-semibold text-green-600">
                  ₹{settlement.amount}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {new Date(settlement.created_at).toLocaleTimeString()}
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  {new Date(settlement.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
          <p className="text-center text-gray-500 p-6">
            No settlements available.
          </p>
      )}
    </div>
  );
};

export default SettlementList;
