import { createSlice } from "@reduxjs/toolkit";

export const createBasketHistorySlice = createSlice({
  name: "BasketHistory",
  initialState: {
    historyCreated: false,
  },
  reducers: {
    setBasketHistory: (state) => {
      state.historyCreated = true;
    },
  },
});

export const { setBasketHistory } = createBasketHistorySlice.actions;

export const selectBasketHistory = (state) =>
  state.BasketHistory.historyCreated;

export default createBasketHistorySlice.reducer;
