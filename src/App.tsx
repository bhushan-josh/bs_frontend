import { BrowserRouter, Route, Routes } from "react-router-dom";
import Transactions from "./pages/transactions/Transactions";
import Profile from "./pages/profile/Profile";
import { FloatingDockDemo } from "./shared/components/ui/floating-dock-demo";
import Landing from "./pages/landing/landing";
import Friends from "./pages/friends/Friends";
import Groups from "./pages/groups/Groups";
import CreateTransaction from "./pages/create_transaction/create_transaction";

function App() {
  return (
    <BrowserRouter>
      <div>
        <div>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/create_transactions" element={<CreateTransaction />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <FloatingDockDemo />
      </div>
    </BrowserRouter>
  );
}

export default App;
