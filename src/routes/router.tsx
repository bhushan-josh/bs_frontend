import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/landing/landing";
import Friends from "../pages/friends/Friends";
import Groups from "../pages/groups/Groups";
import Login from "../pages/auth/login";
import Transactions from "../pages/transactions/Transactions";
import Profile from "../pages/profile/Profile";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/friends", element: <Friends /> },
  { path: "/groups", element: <Groups /> },
  { path: "/create_transactions", element: <Login /> },
  { path: "/transactions", element: <Transactions /> },
  { path: "/profile", element: <Profile /> },
]);

export default router;
