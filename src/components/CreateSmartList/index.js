import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { EditModeList } from 'components'

import * as Styles from './styles'
import {
  fetchGroceries,
  fetchGroceriesBasket,
  postGroceriesBasket,
  putGroceriesBasket,
  selectGroceriesData,
  selectGroceriesCategoriesData,
  selectGroceriesStatus,
  selectGroceriesBasketData,
} from 'features/groceries/groceriesSlice'
import {
  fetchProducts,
  fetchProductsBasket,
  postProductsBasket,
  putProductsBasket,
  selectProductsData,
  selectProductsCategoriesData,
  selectProductsStatus,
  selectProductsBasketData,
} from 'features/products/productsSlice'
import {
  fetchDishes,
  fetchDishesBasket,
  postDishesBasket,
  putDishesBasket,
  selectDishesData,
  selectDishesCategoriesData,
  selectDishesStatus,
  selectDishesBasketData,
} from 'features/dishes/dishesSlice'
import {
  fetchSavedLists,
  fetchSavedListsBasket,
  postSavedListsBasket,
  putSavedListsBasket,
  selectSavedListData,
  selectSavedListCategoriesData,
  selectSavedListStatus,
  selectSavedListBasketData,
} from 'features/savedList/savedListSlice'
import {
  fetchHistoryBasket,
  selectHistoryData,
  selectHistoryStatus,
} from 'features/history/historySlice'
import {
  fetchSettings,
  selectSettingsData,
  selectSettingsStatus,
} from 'features/settings/settingsSlice'

import {
  fetchParentCategories,
  selectParentCategoriesData,
  selectParentCategoriesStatus,
} from 'features/parentCategories/parentCategoriesSlice'
import { setActiveMenuIcon } from 'features/activeMenuIcon/activeMenuIconSlice'
import { dataLoadingStatus } from 'hooks/dataLoadingStatus'

const CreateSmartList = () => {
  const dispatch = useDispatch()

  const [fetchGroceriesData, setFetchGroceriesData] = useState(false)
  const [fetchProductsData, setFetchProductsData] = useState(false)
  const [fetchDishesData, setFetchDishesData] = useState(false)
  const [fetchSavedListsData, setFetchSavedListsData] = useState(false)

  useEffect(() => {
    dispatch(setActiveMenuIcon('shopHelper'))
    dispatch(fetchGroceries())
    dispatch(fetchProducts())
    dispatch(fetchDishes())
    dispatch(fetchSavedLists())
    dispatch(fetchHistoryBasket())
    dispatch(fetchSettings())
    dispatch(fetchParentCategories())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchGroceriesBasket())
  }, [dispatch, fetchGroceriesData])

  useEffect(() => {
    dispatch(fetchProductsBasket())
  }, [dispatch, fetchProductsData])

  useEffect(() => {
    dispatch(fetchDishesBasket())
  }, [dispatch, fetchDishesData])

  useEffect(() => {
    dispatch(fetchSavedListsBasket())
  }, [dispatch, fetchSavedListsData])

  const groceriesCategoriesData = useSelector(selectGroceriesCategoriesData)
  const GroceriesData = useSelector(selectGroceriesData)
  const groceriesBasketData = useSelector(selectGroceriesBasketData)
  const GroceriesStatus = useSelector(selectGroceriesStatus)

  const productsCategoriesData = useSelector(selectProductsCategoriesData)
  const ProductsData = useSelector(selectProductsData)
  const productsBasketData = useSelector(selectProductsBasketData)
  const productsStatus = useSelector(selectProductsStatus)

  const dishesCategoriesData = useSelector(selectDishesCategoriesData)
  const DishesData = useSelector(selectDishesData)
  const dishesBasketData = useSelector(selectDishesBasketData)
  const dishesStatus = useSelector(selectDishesStatus)

  const savedListCategoriesData = useSelector(selectSavedListCategoriesData)
  const SavedListData = useSelector(selectSavedListData)
  const savedListBasketData = useSelector(selectSavedListBasketData)
  const savedListStatus = useSelector(selectSavedListStatus)

  const historyData = useSelector(selectHistoryData)
  const historyStatus = useSelector(selectHistoryStatus)

  const settingsData = useSelector(selectSettingsData)
  const settingsStatus = useSelector(selectSettingsStatus)

  const parentCategories = useSelector(selectParentCategoriesData)
  const parentCategoriesStatus = useSelector(selectParentCategoriesStatus)

  const data = dataLoadingStatus([
    GroceriesStatus,
    productsStatus,
    dishesStatus,
    savedListStatus,
    historyStatus,
    settingsStatus,
    parentCategoriesStatus,
  ])

  if (data.isError) {
    return 'Fetching data error...'
  }

  if (data.isLoading) {
    return 'Loading data...'
  }

  if (!data.isLoaded) {
    return null
  }

  const sortByNumber = settingsData.sortBy === 'Bought most times'

  if (historyData.length === 0) {
    return (
      <div>
        <Styles.Message>
          Your history is empty. I need data to create smartlist!
        </Styles.Message>
      </div>
    )
  }

  if (!sortByNumber && historyData.length < 2) {
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

  const ArrayParentCategories = [
    GroceriesData,
    ProductsData,
    DishesData,
    SavedListData,
  ]

  const historyElements = historyData

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
      array.map((item) => {
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
      parentCategory.map((item) => {
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
        BasketitemsList={groceriesBasketData}
        parentsTitle="Groceries"
        itemsList={
          sortByNumber
            ? sortedGroceriesByValueFromHistory
            : sortedGroceriesByDaysAverage
        }
        filtredCategories={groceriesCategoriesData}
        variant="shop"
        parentCategories={parentCategories}
        postItemToBasket={postGroceriesBasket}
        putBasketItem={putGroceriesBasket}
        updateData={setFetchGroceriesData}
      />
      <EditModeList
        BasketitemsList={productsBasketData}
        parentsTitle="Products"
        itemsList={
          sortByNumber
            ? sortedProductsByValueFromHistory
            : sortedProductsByDaysAverage
        }
        filtredCategories={productsCategoriesData}
        variant="shop"
        parentCategories={parentCategories}
        postItemToBasket={postProductsBasket}
        putBasketItem={putProductsBasket}
        updateData={setFetchProductsData}
      />
      <EditModeList
        BasketitemsList={dishesBasketData}
        parentsTitle="Dishes"
        itemsList={
          sortByNumber
            ? sortedDishesByValueFromHistory
            : sortedDishesByDaysAverage
        }
        filtredCategories={dishesCategoriesData}
        variant="shop"
        parentCategories={parentCategories}
        postItemToBasket={postDishesBasket}
        putBasketItem={putDishesBasket}
        updateData={setFetchDishesData}
      />
      <EditModeList
        BasketitemsList={savedListBasketData}
        parentsTitle="SavedList"
        itemsList={
          sortByNumber
            ? sortedSavedListByValueFromHistory
            : sortedSavedListsByDaysAverage
        }
        filtredCategories={savedListCategoriesData}
        variant="shop"
        parentCategories={parentCategories}
        postItemToBasket={postSavedListsBasket}
        putBasketItem={putSavedListsBasket}
        updateData={setFetchSavedListsData}
      />
    </div>
  )
}

export default CreateSmartList
