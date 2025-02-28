import { BrowserRouter, Route, Routes } from "react-router-dom";
import Transactions from "./pages/transactions/Transactions";
import Profile from "./pages/profile/Profile";
import { FloatingDockDemo } from "./shared/components/ui/floating-dock-demo";
import Landing from "./pages/landing/landing";
import Friends from "./pages/friends/Friends";
import Groups from "./pages/groups/Groups";
import Login from "./pages/auth/login/login";
import Logout from "./pages/auth/login/logout";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Logout/>
        <div>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/create_transactions" element={<Login />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <FloatingDockDemo />
      </BrowserRouter>
    </div>
  );
}

export default App;

// import { RouterProvider } from "react-router-dom";
// import router from "./routes/router";
// import { FloatingDockDemo } from "./shared/components/ui/floating-dock-demo";

// function App() {
//   return (
//     <div className="app-container">
//       <RouterProvider router={router} />
//       <FloatingDockDemo />
//     </div>
//   );
// }

// export default App;
