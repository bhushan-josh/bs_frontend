import { useDeleteGroupMutation } from "./groupApi";
import { useDispatch } from "react-redux";
import { deleteGroup } from "../../redux/slices/groupsslice";
import { toast } from "sonner";

const useDeleteGroup = () => {
  const dispatch = useDispatch();
  const [deleteGroupAPI] = useDeleteGroupMutation();

  const handleDeleteGroup = async (groupId: number) => {
    try {
      await deleteGroupAPI(groupId).unwrap();
      dispatch(deleteGroup(groupId)); // Remove from Redux store
      toast.success("Group deleted successfully!");
    } catch (error: any) {
      console.error("Error deleting group:", error);
      toast.error(error?.data?.message || "Failed to delete group.");
    }
  };

  return { handleDeleteGroup };
};

export default useDeleteGroup;
