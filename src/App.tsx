import { Route, Routes } from "react-router-dom";
import Groups from "./pages/groups/Groups";
import Transactions from "./pages/transactions/Transactions";
import Profile from "./pages/profile/Profile";
import { FloatingDockDemo } from "./shared/container/floating-dock-demo";
import Landing from "./pages/landing/landing";
import UserData from "./pages/friends/container";

function App() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div > 
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/friends" element={<UserData />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <FloatingDockDemo />
    </div>
  );
}


export default App;
