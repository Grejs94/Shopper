import { createSlice } from '@reduxjs/toolkit'

export const showMoreSlice = createSlice({
  name: 'showMore',
  initialState: {
    dishes: false,
    savedList: 'overAll',
  },
  reducers: {
    toggleDishesButton: (state) => {
      state.dishes = !state.dishes
    },
    toggleSavedListButton: (state) => {
      if (state.savedList === 'overAll') {
        state.savedList = 'details'
      } else if (state.savedList === 'details') {
        state.savedList = 'all'
      } else if (state.savedList === 'all') {
        state.savedList = 'overAll'
      }
    },
  },
})

export const {
  toggleDishesButton,
  toggleSavedListButton,
} = showMoreSlice.actions

export const selectDishes = (state) => state.showMore.dishes
export const selectSavedList = (state) => state.showMore.savedList

export default showMoreSlice.reducer
