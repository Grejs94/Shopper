import { createSlice } from '@reduxjs/toolkit'

import api from 'apiRedux'

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    basketData: [],
    categoriesData: [],
    statusData: 'iddle',
    basketDataStatus: 'iddle',
  },
  reducers: {
    fetchProductsDataStarted: (state) => {
      state.statusData = 'inProgress'
    },
    fetchProductsDataSucceeded: (state) => {
      state.statusData = 'succeeded'
    },
    fetchProductsDataFailed: (state) => {
      state.statusData = 'failed'
    },
    fetchProductsBasketDataStarted: (state) => {
      state.basketDataStatus = 'inProgress'
    },
    fetchProductsBasketDataSucceeded: (state) => {
      state.basketDataStatus = 'succeeded'
    },
    fetchProductsBasketDataFailed: (state) => {
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
  fetchProductsDataStarted,
  fetchProductsDataSucceeded,
  fetchProductsDataFailed,
  fetchProductsBasketDataStarted,
  fetchProductsBasketDataSucceeded,
  fetchProductsBasketDataFailed,
  setData,
  setCategoriesData,
  setBasketData,
} = productsSlice.actions

const ifNoDataThrowErrors = (res) => {
  if (res.length < 1) {
    throw new Error()
  }
}

const fetchBasket = async (dispatch) => {
  const basketData = await api.products.getBasketProducts()
  await dispatch(setBasketData(basketData))
}

const BasketFetchBody = async (dispatch, api, data) => {
  dispatch(fetchProductsBasketDataStarted())

  try {
    if (data && api) {
      const res = await api(data)
      ifNoDataThrowErrors(res)
    }

    await fetchBasket(dispatch)
    dispatch(fetchProductsBasketDataSucceeded())
  } catch (error) {
    dispatch(fetchProductsBasketDataFailed())
  }
}

export const fetchProductsBasket = () => async (dispatch) => {
  BasketFetchBody(dispatch)
}

export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsDataStarted())

  try {
    const data = await api.products.getProducts()
    dispatch(setData(data))

    const categoriesData = await api.products.getProductsCategories()
    dispatch(setCategoriesData(categoriesData))

    const basketData = await api.products.getBasketProducts()
    dispatch(setBasketData(basketData))

    dispatch(fetchProductsDataSucceeded())
  } catch (error) {
    dispatch(fetchProductsDataFailed())
  }
}

export const postProductsBasket = (data) => async (dispatch) => {
  BasketFetchBody(dispatch, api.products.postBasketProducts, data)
}

export const putProductsBasket = (data) => async (dispatch) => {
  BasketFetchBody(dispatch, api.products.putBasketProducts, data)
}

export const deleteProductsBasket = ({ id, data }) => async (dispatch) => {
  BasketFetchBody(dispatch, api.products.deleteBasketProducts, { id, data })
}

export const selectProductsData = (state) => state.products.data
export const selectProductsCategoriesData = (state) =>
  state.products.categoriesData
export const selectProductsBasketData = (state) => state.products.basketData
export const selectProductsStatus = (state) => state.products.statusData

export default productsSlice.reducer
