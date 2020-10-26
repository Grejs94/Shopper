import { createSlice } from '@reduxjs/toolkit'

import api from 'apiRedux'

export const parentCategoriesSlice = createSlice({
  name: 'parentCategories',
  initialState: {
    data: [],
    status: 'iddle',
  },
  reducers: {
    fetchParentCategoriesStarted: (state) => {
      state.status = 'inProgress'
    },
    fetchParentCategoriesSucceeded: (state) => {
      state.status = 'succeeded'
    },
    fetchParentCategoriesFailed: (state) => {
      state.status = 'failed'
    },
    setData: (state, action) => {
      state.data = action.payload
    },
  },
})

export const {
  fetchParentCategoriesStarted,
  fetchParentCategoriesSucceeded,
  fetchParentCategoriesFailed,
  setData,
} = parentCategoriesSlice.actions

export const fetchParentCategories = () => async (dispatch) => {
  dispatch(fetchParentCategoriesStarted())

  try {
    const data = await api.parentCategories.getParentCategories()
    dispatch(setData(data))

    dispatch(fetchParentCategoriesSucceeded())
  } catch (error) {
    dispatch(fetchParentCategoriesFailed())
  }
}

export const selectParentCategoriesData = (state) => state.parentCategories.data
export const selectParentCategoriesStatus = (state) =>
  state.parentCategories.status

export default parentCategoriesSlice.reducer
