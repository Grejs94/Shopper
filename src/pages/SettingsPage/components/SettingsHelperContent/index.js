import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as Styles from './styles'
import {
  fetchSettings,
  putSettings,
  selectSettingsData,
  selectSettingsStatus,
} from 'features/settings/settingsSlice'
import { dataLoadingStatus } from 'hooks/dataLoadingStatus'

const SettingsHelperContent = () => {
  const dispatch = useDispatch()
  const [updateSettings, setUpdateSettings] = useState(false)

  useEffect(() => {
    dispatch(fetchSettings())
  }, [dispatch, updateSettings])

  const settingsData = useSelector(selectSettingsData)
  const settingsStatus = useSelector(selectSettingsStatus)

  const data = dataLoadingStatus([settingsStatus])

  if (data.isError) {
    return 'Fetching data error...'
  }

  if (data.isLoading) {
    return 'Loading data...'
  }

  if (!data.isLoaded) {
    return null
  }

  const handleputSettings = ({ data }) => {
    dispatch(putSettings({ data }))

    setUpdateSettings((old) => !old)
  }

  const handleChangeSortBy = () => {
    switch (settingsData.sortBy) {
      case 'Time Intervals':
        handleputSettings({
          data: {
            ...settingsData.data,
            sortBy: 'Bought most times',
          },
        })
        break

      case 'Bought most times':
        handleputSettings({
          data: {
            ...settingsData.data,
            sortBy: 'Time Intervals',
          },
        })
        break

      default:
        break
    }
  }

  return (
    <div>
      <Styles.ParameterContainer>
        <Styles.Parameter>Create smart list based on:</Styles.Parameter>
        <Styles.Button onClick={() => handleChangeSortBy()}>
          {settingsData.sortBy}
        </Styles.Button>
      </Styles.ParameterContainer>
    </div>
  )
}

export default SettingsHelperContent
