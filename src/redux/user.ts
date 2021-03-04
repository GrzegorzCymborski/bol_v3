import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  userLoged: boolean;
  userAuthID: string;
  firebaseData: any;
};

const initialState: UserState = {
  userLoged: false,
  userAuthID: "",
  firebaseData: false,
};

export const counterSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userLoged = true;
      state.firebaseData = action.payload;
      state.userAuthID = btoa(state.firebaseData.userID);
    },
    logout: (state) => {
      state.userLoged = false;
      state.firebaseData = false;
    },
  },
});

export const { login, logout } = counterSlice.actions;
export default counterSlice.reducer;
