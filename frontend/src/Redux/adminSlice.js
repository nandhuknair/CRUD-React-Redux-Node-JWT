import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  admin: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLogin: (state, action) => {
      (state.isAuthenticated = true), (state.admin = action.payload);
    },
    adminLogout: (state) => {
      (state.isAuthenticated = false), (state.admin = null);
    },
  },
});

export const { adminLogin, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
