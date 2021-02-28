import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  userLoged: boolean;
  firebaseData: any;
};

const initialState: UserState = {
  userLoged: false,
  firebaseData: false,
};

export const counterSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userLoged = true;
      state.firebaseData = action.payload;
    },
    logout: (state) => {
      state.userLoged = false;
      state.firebaseData = false;
    },
  },
});

export const { login, logout } = counterSlice.actions;
export default counterSlice.reducer;
