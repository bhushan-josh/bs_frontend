import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetGroupsQuery } from "./groupApi";
import { setGroups } from "../../redux/slices/groupsslice";

const FetchGroups = () => {
  const { data: groups, isSuccess } = useGetGroupsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && groups) {
      dispatch(setGroups(groups));
    }
  }, [isSuccess, groups, dispatch]);

  return null;
};

export default FetchGroups;
