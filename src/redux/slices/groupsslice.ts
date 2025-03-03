import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Group Type
interface Group {
  id: number;
  name: string;
  description?: string;
  creator_id: number;
  group_members?: { member_id: number }[];
}

// Groups State Type
interface GroupsState {
  groups: Group[];
}

// Initial State
const initialState: GroupsState = {
  groups: [],
};

// Groups Slice
const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    // Set all groups (for fetching from API)
    setGroups: (state, action: PayloadAction<Group[]>) => {
      console.log("API Groups:", action.payload);
      state.groups = action.payload;
      console.log("Updated Redux State:", state.groups);
    },

    // Add a new group
    addGroup: (state, action: PayloadAction<Group>) => {
      state.groups.push(action.payload);
    },

    // Update an existing group efficiently using Immer
    updateGroup: (state, action: PayloadAction<Group>) => {
      const index = state.groups.findIndex(group => group.id === action.payload.id);
      if (index !== -1) {
        state.groups[index] = action.payload;
      }
    },

    // Delete a group
    deleteGroup: (state, action: PayloadAction<number>) => {
      state.groups = state.groups.filter((group) => group.id !== action.payload);
    },
  },
});

// Export actions
export const { setGroups, addGroup, updateGroup, deleteGroup } = groupsSlice.actions;

// Selector
export const selectGroups = (state: RootState) => state.groups.groups;

// Export reducer
export default groupsSlice.reducer;
