import { createSlice } from '@reduxjs/toolkit'

import api from 'apiRedux'

export const savedListSlice = createSlice({
  name: 'savedList',
  initialState: {
    data: [],
    categoriesData: [],
    status: 'iddle',
  },
  reducers: {
    fetchSavedListStarted: (state) => {
      state.status = 'inProgress'
    },
    fetchSavedListSucceeded: (state) => {
      state.status = 'succeeded'
    },
    fetchSavedListFailed: (state) => {
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
  fetchSavedListStarted,
  fetchSavedListSucceeded,
  fetchSavedListFailed,
  setData,
  setCategoriesData,
} = savedListSlice.actions

export const fetchSavedLists = () => async (dispatch) => {
  dispatch(fetchSavedListStarted())

  try {
    const data = await api.savedList.getSavedLists()
    dispatch(setData(data))

    const categoriesData = await api.savedList.getSavedListsCategories()
    dispatch(setCategoriesData(categoriesData))

    dispatch(fetchSavedListSucceeded())
  } catch (error) {
    dispatch(fetchSavedListFailed())
  }
}

export const selectSavedListData = (state) => state.savedList.data
export const selectSavedListCategoriesData = (state) =>
  state.savedList.categoriesData
export const selectSavedListStatus = (state) => state.savedList.status

export default savedListSlice.reducer
