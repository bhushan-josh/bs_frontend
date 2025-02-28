import { useLogoutUserMutation } from "./authapi";

const Logout = () => {
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = () => {
    logoutUser();
    alert("Logged out!");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
