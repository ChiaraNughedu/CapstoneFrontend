import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  ruolo: localStorage.getItem("ruolo") || null,
  username: localStorage.getItem("username") || null,
  email: localStorage.getItem("email") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.ruolo = action.payload.ruolo;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    clearUser: (state) => {
      state.token = null;
      state.ruolo = null;
      state.username = null;
      state.email = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
