import { createSlice } from '@reduxjs/toolkit'

import api from 'apiRedux'

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState: {
    data: [],
    categoriesData: [],
    status: 'iddle',
  },
  reducers: {
    fetchDishesStarted: (state) => {
      state.status = 'inProgress'
    },
    fetchDishesSucceeded: (state) => {
      state.status = 'succeeded'
    },
    fetchDishesFailed: (state) => {
      state.status = 'failed'
    },
    setData: (state, action) => {
      state.data = action.payload
    },
    setCategoriesData: (state, action) => {
      state.categoriesData = action.payload
    },
  },
})

export const {
  fetchDishesStarted,
  fetchDishesSucceeded,
  fetchDishesFailed,
  setData,
  setCategoriesData,
} = dishesSlice.actions

export const fetchDishes = () => async (dispatch) => {
  dispatch(fetchDishesStarted())

  try {
    const data = await api.dishes.getDishes()
    dispatch(setData(data))

    const categoriesData = await api.dishes.getDishesCategories()
    dispatch(setCategoriesData(categoriesData))

    dispatch(fetchDishesSucceeded())
  } catch (error) {
    dispatch(fetchDishesFailed())
  }
}

export const selectDishesData = (state) => state.dishes.data
export const selectDishesCategoriesData = (state) => state.dishes.categoriesData
export const selectDishesStatus = (state) => state.dishes.status

export default dishesSlice.reducer
