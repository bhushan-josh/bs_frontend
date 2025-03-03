import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetUsersQuery } from "./usersApi";
import { setUsers } from "../../redux/slices/userslice";

const FetchUsers = () => {
  const { data: users, isSuccess } = useGetUsersQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && users) {
      dispatch(setUsers(users));
    }
  }, [isSuccess, users, dispatch]);

  return null; // No UI needed, just fetching users
};

export default FetchUsers;
