import { createSlice } from '@reduxjs/toolkit';

type Cart = {
  maxCartCapacity: number;
};

type RegisterDateServerTime = {
  seconds: number;
  nanoseconds: number;
};

type LastLoginServerTime = {
  seconds: number;
  nanoseconds: number;
};

type LastLogin = {
  seconds: number;
  nanoseconds: number;
};

type ConnectionData = {
  org: string;
  city: string;
  hostname: string;
  ip: string;
  country: string;
  isp: string;
};

type RegisterDate = {
  seconds: number;
  nanoseconds: number;
};

type FirebaseProps = {
  cart: Cart;
  registerDate_ServerTime: RegisterDateServerTime;
  photoURL: string;
  lastLogin_ServerTime: LastLoginServerTime;
  lastLogin: LastLogin;
  isAdmin: boolean;
  username: string;
  connectionData: ConnectionData;
  registerDate: RegisterDate;
  authorised: boolean;
  userEmail: string;
  userID: string;
};

type UserState = {
  userLoged: boolean;
  userAuthID: string | null;
  firebaseData: FirebaseProps | null;
};

const initialState: UserState = {
  userLoged: false,
  userAuthID: null,
  firebaseData: null,
};

export const counterSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userLoged = true;
      state.firebaseData = action.payload;
      state.userAuthID = btoa(state.firebaseData!.userID);
    },
    logout: (state) => {
      state.userLoged = false;
      state.firebaseData = null;
      state.userAuthID = null;
    },
  },
});

export const { login, logout } = counterSlice.actions;
export default counterSlice.reducer;
