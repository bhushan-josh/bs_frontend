import { Button } from "../../shared/components/button";
import ExpenseList from "./expenseslist";
import SettlementList from "./settlementlist";
import { useState } from "react";

const Transactions = () => {
  const [activeTab, setActiveTab] = useState<"expenses" | "settlements">("expenses");

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('src/assets/images/bg.jpg')",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(255, 255, 255, 0.65)",
      }}
    >
      <div className="absolute left-[20%] transform -translate-x-1/2 top-[5%] text-4xl font-bold font-[Arial] text-gray-400">
        billsplitter
      </div>

      <div className="relative w-[1400px] h-[700px] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col -mt-6 p-8">
        
        <div className="flex justify-center space-x-4 mb-6">
        <Button variant="link" 
            className={`text-lg p-4 ${
              activeTab === "expenses"
                ? " text-gray-1000"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("expenses")}
          >
            Expenses
          </Button>
          <Button variant="link" 
            className={`text-lg p-4 ${
              activeTab === "settlements"
                ? " text-gray-1000"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("settlements")}
          >
            Settlements
          </Button>
        </div>
        <hr></hr>

        <div className="flex-1">
          {activeTab === "expenses" ? <ExpenseList /> : <SettlementList />}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
