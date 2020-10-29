import { createSlice } from '@reduxjs/toolkit'

import api from 'apiRedux'

export const savedListSlice = createSlice({
  name: 'savedList',
  initialState: {
    data: [],
    categoriesData: [],
    basketData: [],
    status: 'iddle',
    postStatus: 'iddle',
    putStatus: 'iddle',
    deleteStatus: 'iddle',
    basketStatus: 'iddle',
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
    fetchSavedListBasketStarted: (state) => {
      state.basketStatus = 'inProgress'
    },
    fetchSavedListBasketSucceeded: (state) => {
      state.basketStatus = 'succeeded'
    },
    fetchSavedListBasketFailed: (state) => {
      state.basketStatus = 'failed'
    },
    postSavedListStarted: (state) => {
      state.postStatus = 'inProgress'
    },
    postSavedListSucceeded: (state) => {
      state.postStatus = 'succeeded'
    },
    postSavedListFailed: (state) => {
      state.postStatus = 'failed'
    },
    putSavedListStarted: (state) => {
      state.putStatus = 'inProgress'
    },
    putSavedListSucceeded: (state) => {
      state.putStatus = 'succeeded'
    },
    putSavedListFailed: (state) => {
      state.putStatus = 'failed'
    },
    deleteSavedListStarted: (state) => {
      state.deleteStatus = 'inProgress'
    },
    deleteSavedListSucceeded: (state) => {
      state.putStatus = 'succeeded'
    },
    deleteSavedListFailed: (state) => {
      state.deleteStatus = 'failed'
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
  fetchSavedListBasketStarted,
  fetchSavedListBasketSucceeded,
  fetchSavedListBasketFailed,
  postSavedListStarted,
  postSavedListSucceeded,
  postSavedListFailed,
  putSavedListStarted,
  putSavedListSucceeded,
  putSavedListFailed,
  deleteSavedListStarted,
  deleteSavedListSucceeded,
  deleteSavedListFailed,
  setData,
  setCategoriesData,
  setBasketData,
} = savedListSlice.actions

const ifNoDataThrowErrors = (res) => {
  if (res.length < 1) {
    throw new Error()
  }
}

export const fetchSavedListsBasket = () => async (dispatch) => {
  dispatch(fetchSavedListBasketStarted())

  try {
    const basketData = await api.savedList.getBasket()
    dispatch(setBasketData(basketData))

    dispatch(fetchSavedListBasketSucceeded())
  } catch (error) {
    dispatch(fetchSavedListBasketFailed())
  }
}

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

export const postSavedListsBasket = (data) => async (dispatch) => {
  dispatch(postSavedListStarted())

  try {
    const res = await api.savedList.postBasketSavedLists(data)

    ifNoDataThrowErrors(res)
    dispatch(postSavedListSucceeded())
  } catch (error) {
    dispatch(postSavedListFailed())
  }
}

export const putSavedListsBasket = (data) => async (dispatch) => {
  dispatch(putSavedListStarted())

  try {
    const res = await api.savedList.putBasketSavedLists(data)

    ifNoDataThrowErrors(res)
    dispatch(putSavedListSucceeded())
  } catch (error) {
    dispatch(putSavedListFailed())
  }
}

export const deleteSavedListsBasket = ({ id, data }) => async (dispatch) => {
  dispatch(deleteSavedListStarted())

  try {
    const res = await api.savedList.deleteBasketSavedLists({ id, data })

    ifNoDataThrowErrors(res)
    dispatch(deleteSavedListSucceeded())
  } catch (error) {
    dispatch(deleteSavedListFailed())
  }
}

export const selectSavedListData = (state) => state.savedList.data
export const selectSavedListCategoriesData = (state) =>
  state.savedList.categoriesData
export const selectSavedListBasketData = (state) => state.savedList.basketData
export const selectSavedListStatus = (state) => state.savedList.status

export default savedListSlice.reducer
