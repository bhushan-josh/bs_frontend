import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/landing/landing";
import Friends from "../pages/friends/Friends";
import Groups from "../pages/groups/group";
import Transactions from "../pages/transactions/expenses";
import Profile from "../pages/profile/profile";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/friends", element: <Friends /> },
  { path: "/groups", element: <Groups /> },
  { path: "/create_transactions", element: <Transactions /> },
  { path: "/transactions", element: <Transactions /> },
  { path: "/profile", element: <Profile /> },
]);

export default router;
