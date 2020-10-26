import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { HistoryParentCategoryList } from './components'
import * as Styles from './styles'
import {
  fetchGroceries,
  selectGroceriesCategoriesData,
  selectGroceriesStatus,
} from 'features/groceries/groceriesSlice'
import {
  fetchProducts,
  selectProductsCategoriesData,
  selectProductsStatus,
} from 'features/products/productsSlice'
import {
  fetchDishes,
  selectDishesCategoriesData,
  selectDishesStatus,
} from 'features/dishes/dishesSlice'
import {
  fetchSavedLists,
  selectSavedListCategoriesData,
  selectSavedListStatus,
} from 'features/savedList/savedListSlice'
import {
  fetchHistoryBasket,
  deleteHistoryBasket,
  selectHistoryData,
  selectHistoryStatus,
} from 'features/history/historySlice'
import { dataLoadingStatus } from 'hooks/dataLoadingStatus'

const HistoryContent = () => {
  const dispatch = useDispatch()
  const [updateHistory, setUpdateHistory] = useState(false)

  useEffect(() => {
    dispatch(fetchGroceries())
    dispatch(fetchProducts())
    dispatch(fetchDishes())
    dispatch(fetchSavedLists())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchHistoryBasket())
  }, [dispatch, updateHistory])

  const groceriesCategoriesData = useSelector(selectGroceriesCategoriesData)
  const groceriesStatus = useSelector(selectGroceriesStatus)

  const productsCategories = useSelector(selectProductsCategoriesData)
  const productsStatus = useSelector(selectProductsStatus)

  const dishesCategories = useSelector(selectDishesCategoriesData)
  const dishesStatus = useSelector(selectDishesStatus)

  const savedListCategories = useSelector(selectSavedListCategoriesData)
  const savedListStatus = useSelector(selectSavedListStatus)

  const historyData = useSelector(selectHistoryData)
  const historyStatus = useSelector(selectHistoryStatus)

  const data = dataLoadingStatus([
    groceriesStatus,
    productsStatus,
    dishesStatus,
    savedListStatus,
    historyStatus,
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

  const showWhenEmpty = (
    <Styles.Message>Your purchase history is empty!</Styles.Message>
  )

  if (historyData.length < 1) {
    return showWhenEmpty
  }

  const CreateHistoryElement = historyData.map(
    ({ groceries, products, dishes, savedLists, id, DateToShow }) => {
      return (
        <Styles.Wrapper key={id}>
          <div>
            <Styles.Date>{DateToShow}</Styles.Date>
            <Styles.Button
              onClick={() => {
                dispatch(deleteHistoryBasket({ id: id }))
                setUpdateHistory((old) => !old)
              }}
            >
              Delete from history
            </Styles.Button>
          </div>

          <HistoryParentCategoryList
            parentsTitle="Groceries"
            itemsList={groceries}
            filtredCategories={groceriesCategoriesData}
          />
          <Styles.EmptyDivToSpace />
          <HistoryParentCategoryList
            parentsTitle="Products"
            itemsList={products}
            filtredCategories={productsCategories}
          />
          <Styles.EmptyDivToSpace />
          <HistoryParentCategoryList
            parentsTitle="Dishes"
            itemsList={dishes}
            filtredCategories={dishesCategories}
          />
          <Styles.EmptyDivToSpace />
          <HistoryParentCategoryList
            parentsTitle="SavedList"
            itemsList={savedLists}
            filtredCategories={savedListCategories}
          />
        </Styles.Wrapper>
      )
    },
  )

  return CreateHistoryElement
}

export default HistoryContent
