import { createSlice } from '@reduxjs/toolkit'
import apiRedux from 'apiRedux'

import api from 'apiRedux'

export const dishesSlice = createSlice({
  name: 'dishes',
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
    fetchDishesStarted: (state) => {
      state.status = 'inProgress'
    },
    fetchDishesSucceeded: (state) => {
      state.status = 'succeeded'
    },
    fetchDishesFailed: (state) => {
      state.status = 'failed'
    },
    fetchDishesBasketStarted: (state) => {
      state.basketStatus = 'inProgress'
    },
    fetchDishesBasketSucceeded: (state) => {
      state.basketStatus = 'succeeded'
    },
    fetchDishesBasketFailed: (state) => {
      state.basketStatus = 'failed'
    },
    postDishesStarted: (state) => {
      state.postStatus = 'inProgress'
    },
    postDishesSucceeded: (state) => {
      state.postStatus = 'succeeded'
    },
    postDishesFailed: (state) => {
      state.postStatus = 'failed'
    },
    putDishesStarted: (state) => {
      state.putStatus = 'inProgress'
    },
    putDishesSucceeded: (state) => {
      state.putStatus = 'succeeded'
    },
    putDishesFailed: (state) => {
      state.putStatus = 'failed'
    },
    deleteDishesStarted: (state) => {
      state.deleteStatus = 'inProgress'
    },
    deleteDishesSucceeded: (state) => {
      state.putStatus = 'succeeded'
    },
    deleteDishesFailed: (state) => {
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
  fetchDishesStarted,
  fetchDishesSucceeded,
  fetchDishesFailed,
  fetchDishesBasketStarted,
  fetchDishesBasketSucceeded,
  fetchDishesBasketFailed,
  postDishesStarted,
  postDishesSucceeded,
  postDishesFailed,
  putDishesStarted,
  putDishesSucceeded,
  putDishesFailed,
  deleteDishesStarted,
  deleteDishesSucceeded,
  deleteDishesFailed,
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
  dispatch(fetchDishesBasketStarted())

  try {
    const basketData = await api.dishes.getBasket()
    dispatch(setBasketData(basketData))

    dispatch(fetchDishesBasketSucceeded())
  } catch (error) {
    dispatch(fetchDishesBasketFailed())
  }
}

export const fetchDishes = () => async (dispatch) => {
  dispatch(fetchDishesStarted())

  try {
    const data = await api.dishes.getDishes()
    dispatch(setData(data))

    const categoriesData = await api.dishes.getDishesCategories()
    dispatch(setCategoriesData(categoriesData))

    const basketData = await apiRedux.dishes.getBasket()
    dispatch(setBasketData(basketData))

    dispatch(fetchDishesSucceeded())
  } catch (error) {
    dispatch(fetchDishesFailed())
  }
}

export const postDishesBasket = (data) => async (dispatch) => {
  dispatch(postDishesStarted())

  try {
    const res = await api.dishes.postBasketDishes(data)

    ifNoDataThrowErrors(res)
    dispatch(postDishesSucceeded())
  } catch (error) {
    dispatch(postDishesFailed())
  }
}

export const putDishesBasket = (data) => async (dispatch) => {
  dispatch(putDishesStarted())

  try {
    const res = await api.dishes.putBasketDishes(data)

    ifNoDataThrowErrors(res)
    dispatch(putDishesSucceeded())
  } catch (error) {
    dispatch(putDishesFailed())
  }
}

export const deleteDishesBasket = ({ id, data }) => async (dispatch) => {
  dispatch(deleteDishesStarted())

  try {
    const res = await api.dishes.deleteBasketDishes({ id, data })

    ifNoDataThrowErrors(res)
    dispatch(deleteDishesSucceeded())
  } catch (error) {
    dispatch(deleteDishesFailed())
  }
}

export const selectDishesData = (state) => state.dishes.data
export const selectDishesCategoriesData = (state) => state.dishes.categoriesData
export const selectDishesBasketData = (state) => state.dishes.basketData
export const selectDishesStatus = (state) => state.dishes.status

export default dishesSlice.reducer
