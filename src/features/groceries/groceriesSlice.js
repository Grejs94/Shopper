import { createSlice } from '@reduxjs/toolkit'

import api from 'apiRedux'

export const groceriesSlice = createSlice({
  name: 'groceries',
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
    fetchGroceriesStarted: (state) => {
      state.status = 'inProgress'
    },
    fetchGroceriesSucceeded: (state) => {
      state.status = 'succeeded'
    },
    fetchGroceriesFailed: (state) => {
      state.status = 'failed'
    },
    fetchGroceriesBasketStarted: (state) => {
      state.basketStatus = 'inProgress'
    },
    fetchGroceriesBasketSucceeded: (state) => {
      state.basketStatus = 'succeeded'
    },
    fetchGroceriesBasketFailed: (state) => {
      state.basketStatus = 'failed'
    },
    postGroceriesStarted: (state) => {
      state.postStatus = 'inProgress'
    },
    postGroceriesSucceeded: (state) => {
      state.postStatus = 'succeeded'
    },
    postGroceriesFailed: (state) => {
      state.postStatus = 'failed'
    },
    putGroceriesStarted: (state) => {
      state.putStatus = 'inProgress'
    },
    putGroceriesSucceeded: (state) => {
      state.putStatus = 'succeeded'
    },
    putGroceriesFailed: (state) => {
      state.putStatus = 'failed'
    },
    deleteGroceriesStarted: (state) => {
      state.deleteStatus = 'inProgress'
    },
    deleteGroceriesSucceeded: (state) => {
      state.putStatus = 'succeeded'
    },
    deleteGroceriesFailed: (state) => {
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
  fetchGroceriesStarted,
  fetchGroceriesSucceeded,
  fetchGroceriesFailed,
  fetchGroceriesBasketStarted,
  fetchGroceriesBasketSucceeded,
  fetchGroceriesBasketFailed,
  postGroceriesStarted,
  postGroceriesSucceeded,
  postGroceriesFailed,
  putGroceriesStarted,
  putGroceriesSucceeded,
  putGroceriesFailed,
  deleteGroceriesStarted,
  deleteGroceriesSucceeded,
  deleteGroceriesFailed,
  setData,
  setCategoriesData,
  setBasketData,
} = groceriesSlice.actions

const ifNoDataThrowErrors = (res) => {
  if (res.length < 1) {
    throw new Error()
  }
}

export const fetchGroceriesBasket = () => async (dispatch) => {
  dispatch(fetchGroceriesBasketStarted())

  try {
    const basketData = await api.groceries.getBasketGroceries()
    dispatch(setBasketData(basketData))

    dispatch(fetchGroceriesBasketSucceeded())
  } catch (error) {
    dispatch(fetchGroceriesBasketFailed())
  }
}

export const fetchGroceries = () => async (dispatch) => {
  dispatch(fetchGroceriesStarted())

  try {
    const data = await api.groceries.getGroceries()
    dispatch(setData(data))

    const categoriesData = await api.groceries.getGroceriesCategories()
    dispatch(setCategoriesData(categoriesData))

    const basketData = await api.groceries.getBasketGroceries()
    dispatch(setBasketData(basketData))

    dispatch(fetchGroceriesSucceeded())
  } catch (error) {
    dispatch(fetchGroceriesFailed())
  }
}

export const postGroceriesBasket = (data) => async (dispatch) => {
  dispatch(postGroceriesStarted())

  try {
    const res = await api.groceries.postBasketGroceries(data)

    ifNoDataThrowErrors(res)
    dispatch(postGroceriesSucceeded())
  } catch (error) {
    dispatch(postGroceriesFailed())
  }
}

export const putGroceriesBasket = ({ id, data }) => async (dispatch) => {
  dispatch(putGroceriesStarted())
  try {
    const res = await api.groceries.putBasketGroceries({ id, data })

    ifNoDataThrowErrors(res)
    dispatch(putGroceriesSucceeded())
  } catch (error) {
    dispatch(putGroceriesFailed())
  }
}

export const deleteGroceriesBasket = ({ id, data }) => async (dispatch) => {
  dispatch(deleteGroceriesStarted())

  try {
    const res = await api.groceries.deleteBasketGroceries({ id, data })

    ifNoDataThrowErrors(res)
    dispatch(deleteGroceriesSucceeded())
  } catch (error) {
    dispatch(deleteGroceriesFailed())
  }
}

export const selectGroceriesData = (state) => state.groceries.data
export const selectGroceriesCategoriesData = (state) =>
  state.groceries.categoriesData
export const selectGroceriesBasketData = (state) => state.groceries.basketData
export const selectGroceriesStatus = (state) => state.groceries.status

export default groceriesSlice.reducer
