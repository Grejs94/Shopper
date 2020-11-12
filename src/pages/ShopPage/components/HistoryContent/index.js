import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { HistoryParentCategoryList } from './components'
import * as Styles from './styles'
import {
  fetchGroceries,
  selectGroceriesCategoriesData,
} from 'features/groceries/groceriesSlice'
import {
  fetchProducts,
  selectProductsCategoriesData,
} from 'features/products/productsSlice'
import {
  fetchDishes,
  selectDishesCategoriesData,
} from 'features/dishes/dishesSlice'
import {
  fetchSavedLists,
  selectSavedListCategoriesData,
} from 'features/savedList/savedListSlice'
import {
  fetchHistoryBasket,
  deleteHistoryBasket,
  selectHistoryData,
} from 'features/history/historySlice'
import { HistoryContentStatus } from 'features/allDataState'

const HistoryContent = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchGroceries())
    dispatch(fetchProducts())
    dispatch(fetchDishes())
    dispatch(fetchSavedLists())
    dispatch(fetchHistoryBasket())
  }, [dispatch])

  const groceriesCategoriesData = useSelector(selectGroceriesCategoriesData)

  const productsCategories = useSelector(selectProductsCategoriesData)

  const dishesCategories = useSelector(selectDishesCategoriesData)

  const savedListCategories = useSelector(selectSavedListCategoriesData)

  const historyData = useSelector(selectHistoryData)

  const data = useSelector(HistoryContentStatus)

  if (data.isError) {
    return 'Fetching data error...'
  }

  if (data.isLoading) {
    return 'Loading data...'
  }

  if (!data.isLoaded) {
    return null
  }

  if (historyData.length < 1) {
    return <Styles.Message>Your purchase history is empty!</Styles.Message>
  }

  return historyData.map(
    ({ groceries, products, dishes, savedLists, id, DateToShow }) => {
      return (
        <Styles.Wrapper key={id}>
          <div>
            <Styles.Date>{DateToShow}</Styles.Date>
            <Styles.Button
              onClick={() => {
                dispatch(deleteHistoryBasket({ id: id }))
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
}

export default HistoryContent
