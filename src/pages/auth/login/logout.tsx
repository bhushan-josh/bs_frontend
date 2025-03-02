import { toast } from "sonner";
import { useLogoutUserMutation } from "../authApi";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    localStorage.removeItem("token"); 

    const currentDateTime = new Date();

    toast("Logged Out", {
      description: currentDateTime.toTimeString()})
    navigate("/"); 
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
