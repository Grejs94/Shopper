import { createSlice } from '@reduxjs/toolkit'

import api from 'apiRedux'

export const groceriesSlice = createSlice({
  name: 'groceries',
  initialState: {
    data: [],
    categoriesData: [],
    basketData: [],
    dataStatus: 'iddle',
    basketDataStatus: 'iddle',
  },
  reducers: {
    fetchGroceriesDataStarted: (state) => {
      state.dataStatus = 'inProgress'
    },
    fetchGroceriesDataSucceeded: (state) => {
      state.dataStatus = 'succeeded'
    },
    fetchGroceriesDataFailed: (state) => {
      state.dataStatus = 'failed'
    },
    fetchGroceriesBasketDataStarted: (state) => {
      state.basketDataStatus = 'inProgress'
    },
    fetchGroceriesBasketDataSucceeded: (state) => {
      state.basketDataStatus = 'succeeded'
    },
    fetchGroceriesBasketDataFailed: (state) => {
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
  fetchGroceriesDataStarted,
  fetchGroceriesDataSucceeded,
  fetchGroceriesDataFailed,
  fetchGroceriesBasketDataStarted,
  fetchGroceriesBasketDataSucceeded,
  fetchGroceriesBasketDataFailed,
  setData,
  setCategoriesData,
  setBasketData,
} = groceriesSlice.actions

const ifNoDataThrowErrors = (res) => {
  if (res.length < 1) {
    throw new Error()
  }
}

const fetchBasket = async (dispatch) => {
  const basketData = await api.groceries.getBasketGroceries()
  await dispatch(setBasketData(basketData))
}

const BasketFetchBody = async (dispatch, api, data) => {
  dispatch(fetchGroceriesBasketDataStarted())

  try {
    if (data && api) {
      const res = await api(data)
      ifNoDataThrowErrors(res)
    }

    await fetchBasket(dispatch)
    dispatch(fetchGroceriesBasketDataSucceeded())
  } catch (error) {
    dispatch(fetchGroceriesBasketDataFailed())
  }
}

export const fetchGroceriesBasket = () => async (dispatch) => {
  BasketFetchBody(dispatch)
}

export const fetchGroceries = () => async (dispatch) => {
  dispatch(fetchGroceriesDataStarted())

  try {
    const data = await api.groceries.getGroceries()
    dispatch(setData(data))

    const categoriesData = await api.groceries.getGroceriesCategories()
    dispatch(setCategoriesData(categoriesData))

    const basketData = await api.groceries.getBasketGroceries()
    dispatch(setBasketData(basketData))

    dispatch(fetchGroceriesDataSucceeded())
  } catch (error) {
    dispatch(fetchGroceriesDataFailed())
  }
}

export const postGroceriesBasket = (data) => async (dispatch) => {
  BasketFetchBody(dispatch, api.groceries.postBasketGroceries, data)
}

export const putGroceriesBasket = ({ id, data }) => async (dispatch) => {
  BasketFetchBody(dispatch, api.groceries.putBasketGroceries, { id, data })
}

export const deleteGroceriesBasket = ({ id, data }) => async (dispatch) => {
  BasketFetchBody(dispatch, api.groceries.deleteBasketGroceries, { id, data })
}

export const selectGroceriesData = (state) => state.groceries.data
export const selectGroceriesCategoriesData = (state) =>
  state.groceries.categoriesData
export const selectGroceriesBasketData = (state) => state.groceries.basketData
export const selectGroceriesStatus = (state) => state.groceries.dataStatus

export default groceriesSlice.reducer
