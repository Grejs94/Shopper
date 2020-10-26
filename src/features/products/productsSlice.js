import { createSlice } from '@reduxjs/toolkit'

import api from 'apiRedux'

export const productsSlice = createSlice({
  name: 'products',
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
    fetchProductsStarted: (state) => {
      state.status = 'inProgress'
    },
    fetchProductsSucceeded: (state) => {
      state.status = 'succeeded'
    },
    fetchProductsFailed: (state) => {
      state.status = 'failed'
    },
    fetchProductsBasketStarted: (state) => {
      state.basketStatus = 'inProgress'
    },
    fetchProductsBasketSucceeded: (state) => {
      state.basketStatus = 'succeeded'
    },
    fetchProductsBasketFailed: (state) => {
      state.basketStatus = 'failed'
    },
    postProductsStarted: (state) => {
      state.postStatus = 'inProgress'
    },
    postProductsSucceeded: (state) => {
      state.postStatus = 'succeeded'
    },
    postProductsFailed: (state) => {
      state.postStatus = 'failed'
    },
    putProductsStarted: (state) => {
      state.putStatus = 'inProgress'
    },
    putProductsSucceeded: (state) => {
      state.putStatus = 'succeeded'
    },
    putProductsFailed: (state) => {
      state.putStatus = 'failed'
    },
    deleteProductsStarted: (state) => {
      state.deleteStatus = 'inProgress'
    },
    deleteProductsSucceeded: (state) => {
      state.putStatus = 'succeeded'
    },
    deleteProductsFailed: (state) => {
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
  fetchProductsStarted,
  fetchProductsSucceeded,
  fetchProductsFailed,
  fetchProductsBasketStarted,
  fetchProductsBasketSucceeded,
  fetchProductsBasketFailed,
  postProductsStarted,
  postProductsSucceeded,
  postProductsFailed,
  putProductsStarted,
  putProductsSucceeded,
  putProductsFailed,
  deleteProductsStarted,
  deleteProductsSucceeded,
  deleteProductsFailed,
  setData,
  setCategoriesData,
  setBasketData,
} = productsSlice.actions

const ifNoDataThrowErrors = (res) => {
  if (!res.data) {
    throw new Error()
  }
}

export const fetchProductsBasket = () => async (dispatch) => {
  dispatch(fetchProductsBasketStarted())

  try {
    const basketData = await api.products.getBasketProducts()
    dispatch(setBasketData(basketData))

    dispatch(fetchProductsBasketSucceeded())
  } catch (error) {
    dispatch(fetchProductsBasketFailed())
  }
}

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

export const postProductsBasket = (data) => async (dispatch) => {
  dispatch(postProductsStarted())

  try {
    const res = await api.products.postBasketProducts(data)

    console.log(res)
    if (!res.data) {
      throw new Error()
    }

    ifNoDataThrowErrors(res)
    dispatch(postProductsSucceeded())
  } catch (error) {
    dispatch(postProductsFailed())
  }
}

export const putProductsBasket = (data) => async (dispatch) => {
  dispatch(putProductsStarted())

  try {
    const res = await api.products.putBasketProducts(data)

    ifNoDataThrowErrors(res)
    dispatch(putProductsSucceeded())
  } catch (error) {
    dispatch(putProductsFailed())
  }
}

export const deleteProductsBasket = ({ id, data }) => async (dispatch) => {
  dispatch(deleteProductsStarted())

  try {
    const res = await api.products.deleteBasketProducts({ id, data })

    ifNoDataThrowErrors(res)
    dispatch(deleteProductsSucceeded())
  } catch (error) {
    dispatch(deleteProductsFailed())
  }
}

export const selectProductsData = (state) => state.products.data
export const selectProductsCategoriesData = (state) =>
  state.products.categoriesData
export const selectProductsBasketData = (state) => state.products.basketData
export const selectProductsStatus = (state) => state.products.status

export default productsSlice.reducer
