import { createSlice } from '@reduxjs/toolkit'

export const activeMenuIconSlice = createSlice({
  name: 'activeMenuIcon',
  initialState: {
    value: 'home',
  },
  reducers: {
    setActiveMenuIcon: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setActiveMenuIcon } = activeMenuIconSlice.actions

export const selectActiveMenuIcon = (state) => state.activeMenuIcon.value

export default activeMenuIconSlice.reducer
