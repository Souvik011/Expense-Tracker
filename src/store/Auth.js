import { createSlice } from "@reduxjs/toolkit";

const initialAuthSlice = {
  email: localStorage.getItem("EmailId"),
  idToken: localStorage.getItem("idToken"),
  isLoggedIn: !!localStorage.getItem("EmailId"),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthSlice,
  reducers: {
    login(state, action) {
      state.email = action.payload.email;
      state.idToken = action.payload.idToken;

      localStorage.setItem("EmailId", action.payload.email);
      localStorage.setItem("idToken", action.payload.idToken);

      state.isLoggedIn = true;
    },
    logout(state) {
      state.email = null;
      state.idToken = null;

      localStorage.removeItem("EmailId");
      localStorage.removeItem("idToken");

      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
