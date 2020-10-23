import React from 'react'

import { EditModeList } from 'components'
import API from 'api'

import * as Styles from './styles'

const CreateSmartList = () => {
  const useGroceres = API.useGroceres()
  const useGroceriesCategories = API.useGroceriesCategories()
  const useProducts = API.useProducts()
  const useProductsCategories = API.useProductsCategories()
  const dishes = API.UseDishes()
  const dishesCategories = API.UseDishesCategory()
  const savedList = API.useSavedList()
  const useSavedListsCategories = API.useSavedListsCategories()

  const useHistory = API.useHistory()

  const useSettings = API.useSettings()

  if (
    useGroceres.isError ||
    useGroceriesCategories.isError ||
    useProducts.isError ||
    useProductsCategories.isError ||
    dishes.isError ||
    dishesCategories.isError ||
    savedList.isError ||
    useSavedListsCategories.isError ||
    useHistory.isError ||
    useSettings.isError
  ) {
    return 'Fetching date error...'
  } else if (
    useGroceres.isLoading ||
    useGroceriesCategories.isLoading ||
    useProducts.isLoading ||
    useProductsCategories.isLoading ||
    dishes.isLoading ||
    dishesCategories.isLoading ||
    savedList.isLoading ||
    useSavedListsCategories.isLoading.isLoading ||
    useHistory.isLoading ||
    useSettings.isLoading
  ) {
    return 'Loading date...'
  }

  const sortByNumber = useSettings.data.sortBy === 'Bought most times'

  if (useHistory.data.length === 0) {
    return (
      <div>
        <Styles.Message>
          Your history is empty. I need data to create smartlist!
        </Styles.Message>
      </div>
    )
  }

  if (!sortByNumber && useHistory.data.length < 2) {
    return (
      <div>
        <Styles.Message>
          Your history is to small. I need at least 2 history data to create
          smartlist sorted by time intervals!
        </Styles.Message>
      </div>
    )
  }

  const workingUseGroceresX = []
  const workingUseProductsX = []
  const workingDishesX = []
  const workingSavedListX = []

  const workingArraysList = [
    workingUseGroceresX,
    workingUseProductsX,
    workingDishesX,
    workingSavedListX,
  ]

  const ArrayParentCategories = [useGroceres, useProducts, dishes, savedList]

  const historyElements = useHistory.data

  const itemsListFromGroceriesWithAverage = []
  const itemsListFromProductsWithAverage = []
  const itemsListFromDishesWithAverage = []
  const itemsListFromSavedListSWithAverage = []

  const arrayOfItemsByAverage = [
    itemsListFromGroceriesWithAverage,
    itemsListFromProductsWithAverage,
    itemsListFromDishesWithAverage,
    itemsListFromSavedListSWithAverage,
  ]

  if (sortByNumber) {
    ArrayParentCategories.map((array, index) => {
      array.data.map((item) => {
        let value = 0

        historyElements.map((history) => {
          const switchParentCategory = (index) => {
            switch (index) {
              case 0:
                return history.groceries
              case 1:
                return history.products
              case 2:
                return history.dishes
              case 3:
                return history.savedLists

              default:
                return history.groceries
            }
          }

          switchParentCategory(index).map((historyItem) => {
            if (item.id === historyItem.id) {
              value++
            }
            return null
          })

          return null
        })
        const parentCategoryItem = { ...item, value: value }

        if (value > 0) {
          workingArraysList[index].push(parentCategoryItem)
        }
        return null
      })
      return null
    })
  } else if (!sortByNumber) {
    ArrayParentCategories.map((parentCategory, index) => {
      parentCategory.data.map((item) => {
        const itemsList = []
        const intervals = []
        historyElements.map((history) => {
          const switchParentCategory = (index) => {
            switch (index) {
              case 0:
                return history.groceries
              case 1:
                return history.products
              case 2:
                return history.dishes
              case 3:
                return history.savedLists

              default:
                return history.groceries
            }
          }
          switchParentCategory(index).map((historyItem) => {
            if (historyItem.id === item.id) {
              intervals.push(history.saved)
            }
            return null
          })
          return null
        })
        if (intervals.length > 1) {
          const workItem = { ...item, intervals: intervals }
          itemsList.push(workItem)
        }

        itemsList.map((updatedItem) => {
          const daysDifferenceArray = []
          const numberOfExecution = updatedItem.intervals.length - 1
          let i
          for (i = 0; i < numberOfExecution; i++) {
            let millisecondsDifference =
              updatedItem.intervals[i + 1] - updatedItem.intervals[i]
            let days = Math.round(millisecondsDifference / 86400000)
            if (days < 1) {
              days = 1
            }
            daysDifferenceArray.push(days)
          }

          let sum = 0
          let j
          for (j = 0; j < daysDifferenceArray.length; j++) {
            sum += daysDifferenceArray[j]
          }

          const daysAverage = Math.round(sum / daysDifferenceArray.length)

          const lastPurchase =
            updatedItem.intervals[updatedItem.intervals.length - 1]

          const nowMilisecondTime = Date.now()

          const timeDifference = nowMilisecondTime - lastPurchase

          let daysPassedSinceTheLastPurchase = Math.round(
            timeDifference / 86400000,
          )
          if (daysPassedSinceTheLastPurchase < 1) {
            daysPassedSinceTheLastPurchase = 1
          }

          const probabilityIndex = daysPassedSinceTheLastPurchase - daysAverage

          const workItem = {
            ...updatedItem,
          }

          arrayOfItemsByAverage[index].push({
            ...workItem,
            value: probabilityIndex,
          })
          return null
        })
        return null
      })
      return null
    })
  }

  const sortedGroceriesByDaysAverage = arrayOfItemsByAverage[0].sort(
    (a, b) => b.daysAverage - a.daysAverage,
  )

  const sortedProductsByDaysAverage = arrayOfItemsByAverage[1].sort(
    (a, b) => b.daysAverage - a.daysAverage,
  )

  const sortedDishesByDaysAverage = arrayOfItemsByAverage[2].sort(
    (a, b) => b.daysAverage - a.daysAverage,
  )

  const sortedSavedListsByDaysAverage = arrayOfItemsByAverage[3].sort(
    (a, b) => b.daysAverage - a.daysAverage,
  )

  const sortedGroceriesByValueFromHistory = workingArraysList[0].sort(
    (a, b) => b.value - a.value,
  )
  const sortedProductsByValueFromHistory = workingArraysList[1].sort(
    (a, b) => b.value - a.value,
  )
  const sortedDishesByValueFromHistory = workingArraysList[2].sort(
    (a, b) => b.value - a.value,
  )
  const sortedSavedListByValueFromHistory = workingArraysList[3].sort(
    (a, b) => b.value - a.value,
  )

  return (
    <div>
      <EditModeList
        parentsTitle="Groceries"
        itemsList={
          sortByNumber
            ? sortedGroceriesByValueFromHistory
            : sortedGroceriesByDaysAverage
        }
        filtredCategories={useGroceriesCategories.data}
        variant="shop"
      />
      <EditModeList
        parentsTitle="Products"
        itemsList={
          sortByNumber
            ? sortedProductsByValueFromHistory
            : sortedProductsByDaysAverage
        }
        filtredCategories={useProductsCategories.data}
        variant="shop"
      />
      <EditModeList
        parentsTitle="Dishes"
        itemsList={
          sortByNumber
            ? sortedDishesByValueFromHistory
            : sortedDishesByDaysAverage
        }
        filtredCategories={dishesCategories.data}
        variant="shop"
      />
      <EditModeList
        parentsTitle="SavedList"
        itemsList={
          sortByNumber
            ? sortedSavedListByValueFromHistory
            : sortedSavedListsByDaysAverage
        }
        filtredCategories={useSavedListsCategories.data}
        variant="shop"
      />
    </div>
  )
}

export default CreateSmartList
