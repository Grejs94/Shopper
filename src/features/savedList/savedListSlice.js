import { createSlice } from '@reduxjs/toolkit'

import api from 'apiRedux'

export const savedListSlice = createSlice({
  name: 'savedList',
  initialState: {
    data: [],
    categoriesData: [],
    basketData: [],
    statusData: 'iddle',
    basketDataStatus: 'iddle',
  },
  reducers: {
    fetchSavedListDataStarted: (state) => {
      state.statusData = 'inProgress'
    },
    fetchSavedListDataSucceeded: (state) => {
      state.statusData = 'succeeded'
    },
    fetchSavedListDataFailed: (state) => {
      state.statusData = 'failed'
    },
    fetchSavedListBasketDataStarted: (state) => {
      state.basketDataStatus = 'inProgress'
    },
    fetchSavedListBasketDataSucceeded: (state) => {
      state.basketDataStatus = 'succeeded'
    },
    fetchSavedListBasketDataFailed: (state) => {
      state.basketDataStatus = 'failed'
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
  fetchSavedListDataStarted,
  fetchSavedListDataSucceeded,
  fetchSavedListDataFailed,
  fetchSavedListBasketDataStarted,
  fetchSavedListBasketDataSucceeded,
  fetchSavedListBasketDataFailed,
  setData,
  setCategoriesData,
  setBasketData,
} = savedListSlice.actions

const ifNoDataThrowErrors = (res) => {
  if (res.length < 1) {
    throw new Error()
  }
}

const fetchBasket = async (dispatch) => {
  const basketData = await api.savedList.getBasket()
  await dispatch(setBasketData(basketData))
}

const BasketFetchBody = async (dispatch, api, data) => {
  dispatch(fetchSavedListBasketDataStarted())

  try {
    if (data && api) {
      const res = await api(data)
      ifNoDataThrowErrors(res)
    }

    await fetchBasket(dispatch)
    dispatch(fetchSavedListBasketDataSucceeded())
  } catch (error) {
    dispatch(fetchSavedListBasketDataFailed())
  }
}

export const fetchSavedListsBasket = () => async (dispatch) => {
  BasketFetchBody(dispatch)
}

export const fetchSavedLists = () => async (dispatch) => {
  dispatch(fetchSavedListDataStarted())

  try {
    const data = await api.savedList.getSavedLists()
    dispatch(setData(data))

    const categoriesData = await api.savedList.getSavedListsCategories()
    dispatch(setCategoriesData(categoriesData))

    const basketData = await api.savedList.getBasket()
    dispatch(setBasketData(basketData))

    dispatch(fetchSavedListDataSucceeded())
  } catch (error) {
    dispatch(fetchSavedListDataFailed())
  }
}

export const postSavedListsBasket = (data) => async (dispatch) => {
  BasketFetchBody(dispatch, api.savedList.postBasketSavedLists, data)
}

export const putSavedListsBasket = (data) => async (dispatch) => {
  BasketFetchBody(dispatch, api.savedList.putBasketSavedLists, data)
}

export const deleteSavedListsBasket = ({ id, data }) => async (dispatch) => {
  BasketFetchBody(dispatch, api.savedList.deleteBasketSavedLists, { id, data })
}

export const selectSavedListData = (state) => state.savedList.data
export const selectSavedListCategoriesData = (state) =>
  state.savedList.categoriesData
export const selectSavedListBasketData = (state) => state.savedList.basketData
export const selectSavedListStatus = (state) => state.savedList.statusData

export default savedListSlice.reducer
