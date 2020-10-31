import { createSelector } from 'reselect'

const selectGroceriesStatus = (state) => state.groceries.dataStatus
const selectProductsStatus = (state) => state.products.statusData
const selectDishesStatus = (state) => state.dishes.dataStatus
const selectSavedListStatus = (state) => state.savedList.statusData
const selectParentCategoriesStatus = (state) => state.parentCategories.status
const selectHistoryStatus = (state) => state.history.status
const selectSettingsStatus = (state) => state.settings.status

export const itemsDataStatus = createSelector(
  selectGroceriesStatus,
  selectProductsStatus,
  selectDishesStatus,
  selectSavedListStatus,
  selectParentCategoriesStatus,

  (
    selectGroceriesStatus,
    selectProductsStatus,
    selectDishesStatus,
    selectSavedListStatus,
    selectParentCategoriesStatus,
  ) => {
    const dataStatus = [
      selectGroceriesStatus,
      selectProductsStatus,
      selectDishesStatus,
      selectSavedListStatus,
      selectParentCategoriesStatus,
    ]

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
  },
)

export const smartListStatus = createSelector(
  selectGroceriesStatus,
  selectProductsStatus,
  selectDishesStatus,
  selectSavedListStatus,
  selectParentCategoriesStatus,
  selectHistoryStatus,
  selectSettingsStatus,

  (
    selectGroceriesStatus,
    selectProductsStatus,
    selectDishesStatus,
    selectSavedListStatus,
    selectParentCategoriesStatus,
    selectHistoryStatus,
    selectSettingsStatus,
  ) => {
    const dataStatus = [
      selectGroceriesStatus,
      selectProductsStatus,
      selectDishesStatus,
      selectSavedListStatus,
      selectParentCategoriesStatus,
      selectHistoryStatus,
      selectSettingsStatus,
    ]

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
  },
)

export const modalDataStatus = createSelector(
  selectGroceriesStatus,
  selectProductsStatus,
  selectDishesStatus,
  selectSavedListStatus,

  (
    selectGroceriesStatus,
    selectProductsStatus,
    selectDishesStatus,
    selectSavedListStatus,
  ) => {
    const dataStatus = [
      selectGroceriesStatus,
      selectProductsStatus,
      selectDishesStatus,
      selectSavedListStatus,
    ]

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
  },
)

export const settingsHelperContentStatus = createSelector(
  selectSettingsStatus,

  (selectSettingsStatus) => {
    const dataStatus = [selectSettingsStatus]

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
  },
)

export const HistoryContentStatus = createSelector(
  selectGroceriesStatus,
  selectProductsStatus,
  selectDishesStatus,
  selectSavedListStatus,
  selectHistoryStatus,

  (
    selectGroceriesStatus,
    selectProductsStatus,
    selectDishesStatus,
    selectSavedListStatus,
    selectHistoryStatus,
  ) => {
    const dataStatus = [
      selectGroceriesStatus,
      selectProductsStatus,
      selectDishesStatus,
      selectSavedListStatus,
      selectHistoryStatus,
    ]

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
  },
)
