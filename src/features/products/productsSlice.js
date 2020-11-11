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

export const fetchProductsBasket = () => async (dispatch) => {
  dispatch(fetchProductsBasketDataStarted())

  try {
    const basketData = await api.products.getBasketProducts()
    dispatch(setBasketData(basketData))

    dispatch(fetchProductsBasketDataSucceeded())
  } catch (error) {
    dispatch(fetchProductsBasketDataFailed())
  }
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
  dispatch(fetchProductsBasketDataStarted())

  try {
    const res = await api.products.postBasketProducts(data)

    if (!res.data) {
      throw new Error()
    }

    ifNoDataThrowErrors(res)
    dispatch(fetchProductsBasketDataSucceeded())
  } catch (error) {
    dispatch(fetchProductsBasketDataFailed())
  }
}

export const putProductsBasket = (data) => async (dispatch) => {
  dispatch(fetchProductsBasketDataStarted())

  try {
    const res = await api.products.putBasketProducts(data)

    ifNoDataThrowErrors(res)
    dispatch(fetchProductsBasketDataSucceeded())
  } catch (error) {
    dispatch(fetchProductsBasketDataFailed())
  }
}

export const deleteProductsBasket = ({ id, data }) => async (dispatch) => {
  dispatch(fetchProductsBasketDataStarted())

  try {
    const res = await api.products.deleteBasketProducts({ id, data })

    ifNoDataThrowErrors(res)
    dispatch(fetchProductsBasketDataSucceeded())
  } catch (error) {
    dispatch(fetchProductsBasketDataFailed())
  }
}

export const selectProductsData = (state) => state.products.data
export const selectProductsCategoriesData = (state) =>
  state.products.categoriesData
export const selectProductsBasketData = (state) => state.products.basketData
export const selectProductsStatus = (state) => state.products.statusData

export default productsSlice.reducer
