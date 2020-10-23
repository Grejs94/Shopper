import { createSlice } from '@reduxjs/toolkit'

export const toggleBottomBarIconsSlice = createSlice({
  name: 'editBottomIcons',
  initialState: {
    editIcon: false,
    addIcon: false,
    removeIcon: false,
  },
  reducers: {
    toggleEditIcon: (state) => {
      state.editIcon = !state.editIcon
    },
    toggleAddIcon: (state) => {
      state.addIcon = !state.addIcon
      state.removeIcon = false
    },
    toggleRemoveIcon: (state) => {
      state.removeIcon = !state.removeIcon
      state.addIcon = false
    },
    resetEditIcon: (state) => {
      state.editIcon = false
    },
  },
})

export const {
  toggleEditIcon,
  toggleAddIcon,
  toggleRemoveIcon,
  resetEditIcon,
} = toggleBottomBarIconsSlice.actions

export const selectEditIcon = (state) => state.editBottomIcons.editIcon
export const selectAddIcon = (state) => state.editBottomIcons.addIcon
export const selectRemoveIcon = (state) => state.editBottomIcons.removeIcon

export default toggleBottomBarIconsSlice.reducer
