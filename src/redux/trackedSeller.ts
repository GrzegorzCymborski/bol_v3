import { createSlice } from '@reduxjs/toolkit';

type TrackedState = {
  trackedProductID: number | undefined;
  trackedOfferID: number | undefined;
  offerURL: string;
};

const initialState: TrackedState = {
  trackedProductID: undefined,
  trackedOfferID: undefined,
  offerURL: '',
};

export const counterSlice = createSlice({
  name: 'trackedSeller',
  initialState,
  reducers: {
    setProductAndOfferIDS: (state, action) => {
      state.trackedProductID = action.payload.productID;
      state.trackedOfferID = action.payload.offerID;
      state.offerURL = action.payload.offer_url;
    },
  },
});

export const { setProductAndOfferIDS } = counterSlice.actions;
export default counterSlice.reducer;
