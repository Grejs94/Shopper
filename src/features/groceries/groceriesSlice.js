import { createSlice } from '@reduxjs/toolkit'

import api from 'apiRedux'

export const groceriesSlice = createSlice({
  name: 'groceries',
  initialState: {
    data: [],
    categoriesData: [],
    status: 'iddle',
  },
  reducers: {
    fetchGroceriesStarted: (state) => {
      state.status = 'inProgress'
    },
    fetchGroceriesSucceeded: (state) => {
      state.status = 'succeeded'
    },
    fetchGroceriesFailed: (state) => {
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
  fetchGroceriesStarted,
  fetchGroceriesSucceeded,
  fetchGroceriesFailed,
  setData,
  setCategoriesData,
} = groceriesSlice.actions

export const fetchGroceries = () => async (dispatch) => {
  dispatch(fetchGroceriesStarted())

  try {
    const data = await api.groceries.getGroceries()
    dispatch(setData(data))

    const categoriesData = await api.groceries.getGroceriesCategories()
    dispatch(setCategoriesData(categoriesData))

    dispatch(fetchGroceriesSucceeded())
  } catch (error) {
    dispatch(fetchGroceriesFailed())
  }
}

export const selectGroceriesData = (state) => state.groceries.data
export const selectGroceriesCategoriesData = (state) =>
  state.groceries.categoriesData
export const selectGroceriesStatus = (state) => state.groceries.status

export default groceriesSlice.reducer
