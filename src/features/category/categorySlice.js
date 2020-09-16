import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    value: "none",
  },
  reducers: {
    setCategory: (state, action) => {
      if (state.value === action.payload) {
        state.value = "none";
      } else {
        state.value = action.payload;
      }
    },
  },
});
export const { setCategory } = categorySlice.actions;

export const selectCategory = (state) => state.category.value;

export default categorySlice.reducer;
