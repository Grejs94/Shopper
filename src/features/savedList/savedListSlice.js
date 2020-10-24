import { createSlice } from '@reduxjs/toolkit'

import api from 'apiRedux'

export const savedListSlice = createSlice({
  name: 'savedList',
  initialState: {
    data: [],
    categoriesData: [],
    basketData: [],
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
    setBasketData: (state, action) => {
      state.basketData = action.payload
    },
  },
})

export const {
  fetchSavedListStarted,
  fetchSavedListSucceeded,
  fetchSavedListFailed,
  setData,
  setCategoriesData,
  setBasketData,
} = savedListSlice.actions

export const fetchSavedLists = () => async (dispatch) => {
  dispatch(fetchSavedListStarted())

  try {
    const data = await api.savedList.getSavedLists()
    dispatch(setData(data))

    const categoriesData = await api.savedList.getSavedListsCategories()
    dispatch(setCategoriesData(categoriesData))

    const basketData = await api.savedList.getBasket()
    dispatch(setBasketData(basketData))

    dispatch(fetchSavedListSucceeded())
  } catch (error) {
    dispatch(fetchSavedListFailed())
  }
}

export const selectSavedListData = (state) => state.savedList.data
export const selectSavedListCategoriesData = (state) =>
  state.savedList.categoriesData
export const selectSavedListBasketData = (state) => state.savedList.basketData
export const selectSavedListStatus = (state) => state.savedList.status

export default savedListSlice.reducer
