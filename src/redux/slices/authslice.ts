import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../../pages/auth/authApi";

// Define user data structure
interface UserData {
  id: number | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  email: string | null;
  full_name: string | null;
}

// Define auth state
interface AuthState {
  token: string | null;
  userData: UserData | null;
}

// Retrieve stored values from localStorage
const storedToken = localStorage.getItem("token");
const storedUserData = localStorage.getItem("userData");

const initialState: AuthState = {
  token: storedToken || null,
  userData: storedUserData ? JSON.parse(storedUserData) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: string; userData: UserData }>) => {
      state.token = action.payload.token;
      state.userData = action.payload.userData;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userData", JSON.stringify(action.payload.userData));
    },
    logout: (state) => {
      state.token = null;
      state.userData = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
      const token = payload?.data?.token;
      const userData = payload?.data;

      if (token) {
        state.token = token;
        localStorage.setItem("token", token);
      }
      if (userData) {
        state.userData = userData;
        localStorage.setItem("userData", JSON.stringify(userData));
      }
    });
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
