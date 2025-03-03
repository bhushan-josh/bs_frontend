import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store"; // Ensure correct path

// Define the user interface
interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string; // Changed to string to support various phone formats
}

// Define the initial state
interface UserState {
  users: User[];
  currentUser: User | null; // Added current user state
}

const initialState: UserState = {
  users: [],
  currentUser: null, // Default to null
};

// Create the user slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
  },
});

// Export actions and selectors
export const { setUsers, setCurrentUser, updateUser } = userSlice.actions;
export const selectUsers = (state: RootState) => state.users.users;
export const selectCurrentUser = (state: RootState) => state.users.currentUser;

export default userSlice.reducer;
