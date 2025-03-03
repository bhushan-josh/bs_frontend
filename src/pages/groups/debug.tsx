import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const DebugAuth = () => {
  const currentUser = useSelector((state: RootState) => state.auth.userData);
  console.log("Redux currentUser:", currentUser);

  return null;
};

export default DebugAuth;
