import { createSlice } from '@reduxjs/toolkit';

type SidebarState = {
  sidebarShow: boolean | '' | 'responsive' | undefined;
};

const initialState: SidebarState = {
  sidebarShow: 'responsive',
};

export const counterSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    changeState: (state, action) => {
      state.sidebarShow = action.payload;
    },
  },
});

export const { changeState } = counterSlice.actions;
export default counterSlice.reducer;
