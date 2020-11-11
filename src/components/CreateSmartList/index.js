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

  const ArrayParentCategories = [
    GroceriesData,
    ProductsData,
    DishesData,
    SavedListData,
  ]

  const historyGroceriesItemsSortByDays = []
  const historyProductsItemsSortByDays = []
  const historyDishesItemsSortByDays = []
  const historySavedListsItemsSortByDays = []

  const historyGroceriesItemsSortByAverage = []
  const historyProductsItemsSortByAverage = []
  const historyDishesItemsSortByAverage = []
  const historySavedListsItemsSortByAverage = []

  const switchParentCategory = (item, history) => {
    switch (item.parentCategoryId) {
      case '1':
        return history.groceries

      case '2':
        return history.products

      case '3':
        return history.dishes

      case '4':
        return history.savedLists

      default:
        break
    }
  }

  if (sortByNumber) {
    ArrayParentCategories.forEach((array) => {
      array.forEach((item) => {
        let value = 0

        historyData.forEach((history) => {
          switchParentCategory(item, history).forEach((historyItem) => {
            if (item.id === historyItem.id) {
              value++
            }
          })
        })
        const parentCategoryItem = { ...item, value: value }

        if (value > 0) {
          const switchArray = () => {
            switch (item.parentCategoryId) {
              case '1':
                return historyGroceriesItemsSortByDays

              case '2':
                return historyProductsItemsSortByDays

              case '3':
                return historyDishesItemsSortByDays

              case '4':
                return historySavedListsItemsSortByDays

              default:
                break
            }
          }

          switchArray().push(parentCategoryItem)
        }
      })
    })
  } else if (!sortByNumber) {
    ArrayParentCategories.forEach((parentCategory, index) => {
      parentCategory.forEach((item) => {
        const itemsList = []
        const intervals = []
        historyData.forEach((history) => {
          switchParentCategory(index, history).forEach((historyItem) => {
            if (historyItem.id === item.id) {
              intervals.push(history.saved)
            }
          })
        })
        if (intervals.length > 1) {
          const workItem = { ...item, intervals: intervals }
          itemsList.push(workItem)
        }

        itemsList.forEach((updatedItem) => {
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

          const switchAverageArray = (item) => {
            switch (item.parentCategoryId) {
              case '1':
                return historyGroceriesItemsSortByAverage

              case '2':
                return historyProductsItemsSortByAverage

              case '3':
                return historyDishesItemsSortByAverage

              case '4':
                return historySavedListsItemsSortByAverage

              default:
                break
            }
          }

          switchAverageArray(item).push({
            ...workItem,
            value: probabilityIndex,
          })
        })
      })
    })
  }

  const sortdaysAverage = (array) =>
    array.sort((a, b) => b.daysAverage - a.daysAverage)

  const sortdaysValue = (array) => array.sort((a, b) => b.value - a.value)

  const propsItemsList = {
    Groceries: sortByNumber
      ? sortdaysValue(historyGroceriesItemsSortByDays)
      : sortdaysAverage(historyGroceriesItemsSortByAverage),
    Products: sortByNumber
      ? sortdaysValue(historyProductsItemsSortByDays)
      : sortdaysAverage(historyProductsItemsSortByAverage),
    Dishes: sortByNumber
      ? sortdaysValue(historyDishesItemsSortByDays)
      : sortdaysAverage(historyDishesItemsSortByAverage),
    SavedList: sortByNumber
      ? sortdaysValue(historySavedListsItemsSortByDays)
      : sortdaysAverage(historySavedListsItemsSortByAverage),
  }

  const getEditModeListProps = (
    data,
    parentsTitle,
    itemsList,
    filtredCategories,
    postItemToBasket,
    putBasketItem,
    updateData,
  ) => ({
    BasketitemsList: data,
    parentsTitle,
    itemsList: itemsList[parentsTitle],
    filtredCategories,
    variant: 'shop',
    parentCategories,
    postItemToBasket,
    putBasketItem,
    updateData: () => dispatch(updateData()),
  })

  return (
    <div>
      <EditModeList
        {...getEditModeListProps(
          groceriesBasketData,
          'Groceries',
          propsItemsList,
          groceriesCategoriesData,
          postGroceriesBasket,
          putGroceriesBasket,
          fetchGroceriesBasket,
        )}
      />
      <EditModeList
        {...getEditModeListProps(
          productsBasketData,
          'Products',
          propsItemsList,
          productsCategoriesData,
          postProductsBasket,
          putProductsBasket,
          fetchProductsBasket,
        )}
      />
      <EditModeList
        {...getEditModeListProps(
          dishesBasketData,
          'Dishes',
          propsItemsList,
          dishesCategoriesData,
          postDishesBasket,
          putDishesBasket,
          fetchDishesBasket,
        )}
      />
      <EditModeList
        {...getEditModeListProps(
          savedListBasketData,
          'SavedList',
          propsItemsList,
          savedListCategoriesData,
          postSavedListsBasket,
          putSavedListsBasket,
          fetchSavedListsBasket,
        )}
      />
    </div>
  )
}

export default CreateSmartList
