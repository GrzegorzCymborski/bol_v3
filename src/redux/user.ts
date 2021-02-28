import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  userLoged: boolean;
};

const initialState: UserState = {
  userLoged: false,
};

export const counterSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    login: (state) => {
      state.userLoged = true;
    },
    logout: (state) => {
      state.userLoged = false;
    },
  },
});

export const { login, logout } = counterSlice.actions;
export default counterSlice.reducer;
