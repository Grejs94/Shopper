import { createSlice } from '@reduxjs/toolkit'

import api from 'apiRedux'

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    data: [],
    status: 'iddle',
    putStatus: 'iddle',
    deleteStatus: 'iddle',
  },
  reducers: {
    fetchSettingsStarted: (state) => {
      state.status = 'inProgress'
    },
    fetchSettingsSucceeded: (state) => {
      state.status = 'succeeded'
    },
    fetchSettingsFailed: (state) => {
      state.status = 'failed'
    },
    putSettingsStarted: (state) => {
      state.postStatus = 'inProgress'
    },
    putSettingsSucceeded: (state) => {
      state.postStatus = 'succeeded'
    },
    putSettingsFailed: (state) => {
      state.postStatus = 'failed'
    },
    setData: (state, action) => {
      state.data = action.payload
    },
  },
})

export const {
  fetchSettingsStarted,
  fetchSettingsSucceeded,
  fetchSettingsFailed,
  putSettingsStarted,
  putSettingsSucceeded,
  putSettingsFailed,
  setData,
} = settingsSlice.actions

const ifNoDataThrowErrors = (res) => {
  if (res.length < 1) {
    throw new Error()
  }
}

export const fetchSettings = () => async (dispatch) => {
  dispatch(fetchSettingsStarted())

  try {
    const basketData = await api.settings.getSettings()
    dispatch(setData(basketData))

    dispatch(fetchSettingsSucceeded())
  } catch (error) {
    dispatch(fetchSettingsFailed())
  }
}

export const putSettings = ({ data }) => async (dispatch) => {
  dispatch(putSettingsStarted())

  try {
    const res = await api.settings.putSettings({ data })

    ifNoDataThrowErrors(res)
    dispatch(putSettingsSucceeded())
  } catch (error) {
    dispatch(putSettingsFailed())
  }
}

export const selectSettingsData = (state) => state.settings.data
export const selectSettingsStatus = (state) => state.settings.status

export default settingsSlice.reducer
