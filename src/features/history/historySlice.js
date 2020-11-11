import { createSlice } from '@reduxjs/toolkit'

import api from 'apiRedux'

export const historySlice = createSlice({
  name: 'history',
  initialState: {
    data: [],
    status: 'iddle',
    postStatus: 'iddle',
    deleteStatus: 'iddle',
  },
  reducers: {
    fetchHistoryStarted: (state) => {
      state.status = 'inProgress'
    },
    fetchHistorySucceeded: (state) => {
      state.status = 'succeeded'
    },
    fetchHistoryFailed: (state) => {
      state.status = 'failed'
    },
    postHistoryStarted: (state) => {
      state.postStatus = 'inProgress'
    },
    postHistorySucceeded: (state) => {
      state.postStatus = 'succeeded'
    },
    postHistoryFailed: (state) => {
      state.postStatus = 'failed'
    },
    deleteHistoryStarted: (state) => {
      state.deleteStatus = 'inProgress'
    },
    deleteHistorySucceeded: (state) => {
      state.putStatus = 'succeeded'
    },
    deleteHistoryFailed: (state) => {
      state.deleteStatus = 'failed'
    },
    setData: (state, action) => {
      state.data = action.payload
    },
  },
})

export const {
  fetchHistoryStarted,
  fetchHistorySucceeded,
  fetchHistoryFailed,
  postHistoryStarted,
  postHistorySucceeded,
  postHistoryFailed,
  deleteHistoryStarted,
  deleteHistorySucceeded,
  deleteHistoryFailed,
  setData,
} = historySlice.actions

const ifNoDataThrowErrors = (res) => {
  if (res.length < 1) {
    throw new Error()
  }
}

export const fetchHistoryBasket = () => async (dispatch) => {
  dispatch(fetchHistoryStarted())

  try {
    const basketData = await api.history.getHistory()
    dispatch(setData(basketData))

    dispatch(fetchHistorySucceeded())
  } catch (error) {
    dispatch(fetchHistoryFailed())
  }
}

export const postHistoryBasket = ({ data }) => async (dispatch) => {
  dispatch(postHistoryStarted())

  try {
    const res = await api.history.postHistory({ data })

    ifNoDataThrowErrors(res)
    dispatch(postHistorySucceeded())
  } catch (error) {
    dispatch(postHistoryFailed())
  }
}

export const deleteHistoryBasket = ({ id }) => async (dispatch) => {
  dispatch(deleteHistoryStarted())

  try {
    const res = await api.history.deleteHistory({ id })

    ifNoDataThrowErrors(res)
    dispatch(deleteHistorySucceeded())
  } catch (error) {
    dispatch(deleteHistoryFailed())
  }
}

export const selectHistoryData = (state) => state.history.data
export const selectHistoryStatus = (state) => state.history.status

export default historySlice.reducer
