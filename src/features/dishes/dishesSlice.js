import { createSlice } from '@reduxjs/toolkit'
import apiRedux from 'apiRedux'

import api from 'apiRedux'

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState: {
    data: [],
    categoriesData: [],
    basketData: [],
    dataStatus: 'iddle',
    basketDataStatus: 'iddle',
  },
  reducers: {
    fetchDishesDataStarted: (state) => {
      state.dataStatus = 'inProgress'
    },
    fetchDishesDataSucceeded: (state) => {
      state.dataStatus = 'succeeded'
    },
    fetchDishesDataFailed: (state) => {
      state.dataStatus = 'failed'
    },
    fetchDishesBasketDataStarted: (state) => {
      state.basketDataStatus = 'inProgress'
    },
    fetchDishesBasketDataSucceeded: (state) => {
      state.basketDataStatus = 'succeeded'
    },
    fetchDishesBasketDataFailed: (state) => {
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
  fetchDishesDataStarted,
  fetchDishesDataSucceeded,
  fetchDishesDataFailed,
  fetchDishesBasketDataStarted,
  fetchDishesBasketDataSucceeded,
  fetchDishesBasketDataFailed,
  setData,
  setCategoriesData,
  setBasketData,
} = dishesSlice.actions

const ifNoDataThrowErrors = (res) => {
  if (res.length < 1) {
    throw new Error()
  }
}

export const fetchDishesBasket = () => async (dispatch) => {
  dispatch(fetchDishesBasketDataStarted())

  try {
    const basketData = await api.dishes.getBasket()
    dispatch(setBasketData(basketData))

    dispatch(fetchDishesBasketDataSucceeded())
  } catch (error) {
    dispatch(fetchDishesBasketDataFailed())
  }
}

export const fetchDishes = () => async (dispatch) => {
  dispatch(fetchDishesDataStarted())

  try {
    const data = await api.dishes.getDishes()
    dispatch(setData(data))

    const categoriesData = await api.dishes.getDishesCategories()
    dispatch(setCategoriesData(categoriesData))

    const basketData = await apiRedux.dishes.getBasket()
    dispatch(setBasketData(basketData))

    dispatch(fetchDishesDataSucceeded())
  } catch (error) {
    dispatch(fetchDishesDataFailed())
  }
}

export const postDishesBasket = (data) => async (dispatch) => {
  dispatch(fetchDishesBasketDataStarted())

  try {
    const res = await api.dishes.postBasketDishes(data)

    ifNoDataThrowErrors(res)
    dispatch(fetchDishesBasketDataSucceeded())
  } catch (error) {
    dispatch(fetchDishesBasketDataFailed())
  }
}

export const putDishesBasket = (data) => async (dispatch) => {
  dispatch(fetchDishesBasketDataStarted())

  try {
    const res = await api.dishes.putBasketDishes(data)

    ifNoDataThrowErrors(res)
    dispatch(fetchDishesBasketDataSucceeded())
  } catch (error) {
    dispatch(fetchDishesBasketDataFailed())
  }
}

export const deleteDishesBasket = ({ id, data }) => async (dispatch) => {
  dispatch(fetchDishesBasketDataStarted())

  try {
    const res = await api.dishes.deleteBasketDishes({ id, data })

    ifNoDataThrowErrors(res)
    dispatch(fetchDishesBasketDataSucceeded())
  } catch (error) {
    dispatch(fetchDishesBasketDataFailed())
  }
}

export const selectDishesData = (state) => state.dishes.data
export const selectDishesCategoriesData = (state) => state.dishes.categoriesData
export const selectDishesBasketData = (state) => state.dishes.basketData
export const selectDishesStatus = (state) => state.dishes.dataStatus

export default dishesSlice.reducer
