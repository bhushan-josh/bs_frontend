import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../pages/auth/authapi";

interface AuthState {
  token: string | null;
  userData: {
    id: number | null;
    first_name: string | null;
    last_name: string | null;
    phone: string | null;
    email: string | null;
    full_name: string | null;
  };
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  userData: {
    id: null,
    first_name: null,
    last_name: null,
    phone: null,
    email: null,
    full_name: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userData = {
        id: null,
        first_name: null,
        last_name: null,
        phone: null,
        email: null,
        full_name: null,
      };
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        const token = payload?.data?.token;
        const userData = payload?.data;
        if (token) {
          state.token = token;
          localStorage.setItem("token", token);
        }
        if (userData) {
          state.userData = userData;
        }
      }
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
