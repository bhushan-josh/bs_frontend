import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../pages/auth/authapi";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        const token = payload?.data?.token;
        if (token) {
          state.token = token;
          localStorage.setItem("token", token);
        }
      }
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
