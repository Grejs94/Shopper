import { createSlice } from '@reduxjs/toolkit'

export const createBasketHistorySlice = createSlice({
  name: 'BasketHistory',
  initialState: {
    historyCreated: false,
    fakeHistory: false,
  },
  reducers: {
    setBasketHistory: (state) => {
      state.historyCreated = true
      state.fakeHistory = true
    },
    setFakeHistory: (state) => {
      state.fakeHistory = true
    },
  },
})

export const {
  setBasketHistory,
  setFakeHistory,
} = createBasketHistorySlice.actions

export const selectBasketHistory = (state) => state.BasketHistory.historyCreated

export const selectFakeHistory = (state) => state.BasketHistory.fakeHistory

export default createBasketHistorySlice.reducer
