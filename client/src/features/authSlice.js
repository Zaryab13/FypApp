import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      return { ...action.payload };
    },
    logout: (state) => {
      return null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
