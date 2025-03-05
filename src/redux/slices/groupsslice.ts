import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Group {
  id: number;
  name: string;
  description?: string;
  creator_id: number;
}

interface GroupsState {
  groups: Group[];
}

const initialState: GroupsState = {
  groups: [],
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setGroups: (state, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },
    addGroup: (state, action: PayloadAction<Group>) => {
      state.groups.push(action.payload);
    },
    updateGroup: (state, action: PayloadAction<Group>) => {
      state.groups = state.groups.map((group) =>
        group.id === action.payload.id ? action.payload : group
      );
    },
    deleteGroup: (state, action: PayloadAction<number>) => {
      state.groups = state.groups.filter((group) => group.id !== action.payload);
    },
  },
});

export const { setGroups, addGroup, updateGroup, deleteGroup } = groupsSlice.actions;
export const selectGroups = (state: RootState) => state.groups.groups;

export default groupsSlice.reducer;
