import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { EditModeList } from 'components'

import { selectCategory } from 'features/category/categorySlice'
import {
  fetchGroceries,
  selectGroceriesData,
  selectGroceriesCategoriesData,
  selectGroceriesStatus,
} from 'features/groceries/groceriesSlice'
import {
  fetchProducts,
  selectProductsData,
  selectProductsCategoriesData,
  selectProductsStatus,
} from 'features/products/productsSlice'
import {
  fetchDishes,
  selectDishesData,
  selectDishesCategoriesData,
  selectDishesStatus,
} from 'features/dishes/dishesSlice'
import {
  fetchSavedLists,
  selectSavedListData,
  selectSavedListCategoriesData,
  selectSavedListStatus,
} from 'features/savedList/savedListSlice'
import { dataLoadingStatus } from 'hooks/dataLoadingStatus'

const ScrollToParentCategory = ({ category }) => {
  const div = document.querySelector(`#${category}`)

  if (!!div) {
    div.scrollIntoView()
  }
}

function ElementsPage() {
  useEffect(() => {
    dispatch(fetchGroceries())
    dispatch(fetchProducts())
    dispatch(fetchDishes())
    dispatch(fetchSavedLists())
  }, [])

  const dispatch = useDispatch()

  const grocereiesData = useSelector(selectGroceriesData)
  const groceriesCategoriesData = useSelector(selectGroceriesCategoriesData)
  const GroceriesStatus = useSelector(selectGroceriesStatus)

  const products = useSelector(selectProductsData)
  const productsCategories = useSelector(selectProductsCategoriesData)
  const productsStatus = useSelector(selectProductsStatus)

  const dishes = useSelector(selectDishesData)
  const dishesCategories = useSelector(selectDishesCategoriesData)
  const dishesStatus = useSelector(selectDishesStatus)

  const savedList = useSelector(selectSavedListData)
  const savedListCategories = useSelector(selectSavedListCategoriesData)
  const savedListStatus = useSelector(selectSavedListStatus)

  const data = dataLoadingStatus([
    GroceriesStatus,
    productsStatus,
    dishesStatus,
    savedListStatus,
  ])

  const category = useSelector(selectCategory)

  ScrollToParentCategory({ category })

  return data.isError ? (
    'Fetching date error...'
  ) : data.isLoading ? (
    'Loading date...'
  ) : data.isLoaded ? (
    <div>
      <EditModeList
        parentsTitle="Groceries"
        itemsList={grocereiesData}
        filtredCategories={groceriesCategoriesData}
        variant="shop"
      />
      <EditModeList
        parentsTitle="Products"
        itemsList={products}
        filtredCategories={productsCategories}
        variant="shop"
      />
      <EditModeList
        parentsTitle="Dishes"
        itemsList={dishes}
        filtredCategories={dishesCategories}
        variant="shop"
      />
      <EditModeList
        parentsTitle="SavedList"
        itemsList={savedList}
        filtredCategories={savedListCategories}
        variant="shop"
      />
    </div>
  ) : null
}

export default ElementsPage
