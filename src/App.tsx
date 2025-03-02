import { JSX } from "react";
import { FloatingDockDemo } from "./shared/components/floating-dock-demo";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Profile from "./pages/profile/Profile";
import Landing from "./pages/landing/landing";
import Login from "./pages/auth/login/login";
import Logout from "./pages/auth/login/logout";
import HomePage from "./pages/home/home";
import Signup from "./pages/auth/signup/signup";
import { Toaster } from "sonner";
import ErrorPage from "./pages/404erroe";
import CreateTransaction from "./pages/create_transaction/create_transaction";
import UsersList from "./pages/friends/firends";
import GroupsList from "./pages/groups/group";
import Transactions from "./pages/transactions/transactions";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/home" element={<PrivateRoute><><HomePage /><FloatingDockDemo/></></PrivateRoute>} />
        <Route path="/friends" element={<PrivateRoute><><UsersList /><FloatingDockDemo/></></PrivateRoute>} />
        <Route path="/groups" element={<PrivateRoute><><GroupsList /><FloatingDockDemo/></></PrivateRoute>} />
        <Route path="/create_transactions" element={<PrivateRoute><><CreateTransaction /><FloatingDockDemo/></></PrivateRoute>} />
        <Route path="/transactions" element={<PrivateRoute><><Transactions /><FloatingDockDemo/></></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><><Profile /><FloatingDockDemo/></></PrivateRoute>} />
        <Route path="*" element={<ErrorPage/>} />

      </Routes>

        {/* <FloatingDockDemo/> */}
        <Toaster/>
    </Router>
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
