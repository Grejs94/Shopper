import { createSlice } from '@reduxjs/toolkit'

import api from 'apiRedux'

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    categoriesData: [],
    basketData: [],
    status: 'iddle',
  },
  reducers: {
    fetchProductsStarted: (state) => {
      state.status = 'inProgress'
    },
    fetchProductsSucceeded: (state) => {
      state.status = 'succeeded'
    },
    fetchProductsFailed: (state) => {
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
  fetchProductsStarted,
  fetchProductsSucceeded,
  fetchProductsFailed,
  setData,
  setCategoriesData,
  setBasketData,
} = productsSlice.actions

export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsStarted())

  try {
    const data = await api.products.getProducts()
    dispatch(setData(data))

    const categoriesData = await api.products.getProductsCategories()
    dispatch(setCategoriesData(categoriesData))

    const basketData = await api.products.getBasketProducts()
    dispatch(setBasketData(basketData))

    dispatch(fetchProductsSucceeded())
  } catch (error) {
    dispatch(fetchProductsFailed())
  }
}

export const selectProductsData = (state) => state.products.data
export const selectProductsCategoriesData = (state) =>
  state.products.categoriesData
export const selectProductsBasketData = (state) => state.products.basketData
export const selectProductsStatus = (state) => state.products.status

export default productsSlice.reducer
