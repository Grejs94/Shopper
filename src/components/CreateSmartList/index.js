import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { EditModeList } from 'components'

import * as Styles from './styles'
import { smartListStatus } from 'features/allDataState'
import {
  fetchGroceries,
  fetchGroceriesBasket,
  postGroceriesBasket,
  putGroceriesBasket,
  selectGroceriesData,
  selectGroceriesCategoriesData,
  selectGroceriesBasketData,
} from 'features/groceries/groceriesSlice'
import {
  fetchProducts,
  fetchProductsBasket,
  postProductsBasket,
  putProductsBasket,
  selectProductsData,
  selectProductsCategoriesData,
  selectProductsBasketData,
} from 'features/products/productsSlice'
import {
  fetchDishes,
  fetchDishesBasket,
  postDishesBasket,
  putDishesBasket,
  selectDishesData,
  selectDishesCategoriesData,
  selectDishesBasketData,
} from 'features/dishes/dishesSlice'
import {
  fetchSavedLists,
  fetchSavedListsBasket,
  postSavedListsBasket,
  putSavedListsBasket,
  selectSavedListData,
  selectSavedListCategoriesData,
  selectSavedListBasketData,
} from 'features/savedList/savedListSlice'
import {
  fetchHistoryBasket,
  selectHistoryData,
} from 'features/history/historySlice'
import {
  fetchSettings,
  selectSettingsData,
} from 'features/settings/settingsSlice'

import {
  fetchParentCategories,
  selectParentCategoriesData,
} from 'features/parentCategories/parentCategoriesSlice'
import { setActiveMenuIcon } from 'features/activeMenuIcon/activeMenuIconSlice'

const CreateSmartList = () => {
  const dispatch = useDispatch()

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

  const groceriesCategoriesData = useSelector(selectGroceriesCategoriesData)
  const GroceriesData = useSelector(selectGroceriesData)
  const groceriesBasketData = useSelector(selectGroceriesBasketData)

  const productsCategoriesData = useSelector(selectProductsCategoriesData)
  const ProductsData = useSelector(selectProductsData)
  const productsBasketData = useSelector(selectProductsBasketData)

  const dishesCategoriesData = useSelector(selectDishesCategoriesData)
  const DishesData = useSelector(selectDishesData)
  const dishesBasketData = useSelector(selectDishesBasketData)

  const savedListCategoriesData = useSelector(selectSavedListCategoriesData)
  const SavedListData = useSelector(selectSavedListData)
  const savedListBasketData = useSelector(selectSavedListBasketData)

  const historyData = useSelector(selectHistoryData)

  const settingsData = useSelector(selectSettingsData)

  const parentCategories = useSelector(selectParentCategoriesData)

  const data = useSelector(smartListStatus)

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
        updateData={() => dispatch(fetchGroceriesBasket())}
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
        updateData={() => dispatch(fetchProductsBasket())}
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
        updateData={() => dispatch(fetchDishesBasket())}
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
        updateData={() => dispatch(fetchSavedListsBasket())}
      />
    </div>
  )
}

export default CreateSmartList
