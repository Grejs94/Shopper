import { createSlice } from "@reduxjs/toolkit";

export const toggleBottomBarIconsSlice = createSlice({
  name: "editBottomIcons",
  initialState: {
    editIcon: true,
  },
  reducers: {
    toggleEditIcon: (state) => {
      state.editIcon = !state.editIcon;
    },
    resetEditIcon: (state) => {
      state.editIcon = false;
    },
  },
});

export const {
  toggleEditIcon,
  resetEditIcon,
} = toggleBottomBarIconsSlice.actions;

export const selectEditIcon = (state) => state.editBottomIcons.editIcon;

export default toggleBottomBarIconsSlice.reducer;
