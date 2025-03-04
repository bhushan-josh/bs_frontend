import ExpenseList from "./expenseslist";
import SettlementList from "./settlementlist";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../shared/components/tabs";

const Transactions = () => {
  return (
    <>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="password">Expenses</TabsTrigger>
          <TabsTrigger value="account">Settlements</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <SettlementList/>
        </TabsContent>
        <TabsContent value="password"><ExpenseList/></TabsContent>
      </Tabs>
    </>
  );
};

export default Transactions;
