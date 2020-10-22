import React from 'react'

import API from 'API'

import * as Styles from './styles'

const SettingsHelperContent = () => {
  const useSettings = API.useSettings()
  const [mutate_PUT_Settings] = API.usePutSettings()

  if (useSettings.isError) {
    return 'Fetching date error...'
  } else if (useSettings.isLoading) {
    return 'Loading date...'
  }

  const handleChangeSortBy = () => {
    switch (useSettings.data.sortBy) {
      case 'Time Intervals':
        mutate_PUT_Settings({
          data: {
            ...useSettings.data,
            sortBy: 'Bought most times',
          },
        })
        break

      case 'Bought most times':
        mutate_PUT_Settings({
          data: {
            ...useSettings.data,
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
          {useSettings.data.sortBy}
        </Styles.Button>
      </Styles.ParameterContainer>
    </div>
  )
}

export default SettingsHelperContent
