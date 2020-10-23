export const dataLoadingStatus = (dataStatus) => {
  let result = {
    isError: false,
    isLoading: true,
    isLoaded: false,
  }

  let workingIsLoaded = true

  dataStatus.forEach((singleStatus) => {
    if (singleStatus === 'failed') {
      result.isError = true
    }

    if (singleStatus === 'inProgress') {
      result.isLoading = true
    }

    if (singleStatus !== 'succeeded') {
      workingIsLoaded = false
    }
  })

  result.isLoaded = workingIsLoaded

  if (result.isLoaded) {
    result.isLoading = false
  }

  return result
}
