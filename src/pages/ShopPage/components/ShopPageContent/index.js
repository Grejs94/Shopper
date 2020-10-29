import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { EditModeList } from 'components'

import { selectCategory } from 'features/category/categorySlice'
import {
  fetchGroceries,
  fetchGroceriesBasket,
  postGroceriesBasket,
  putGroceriesBasket,
  selectGroceriesData,
  selectGroceriesBasketData,
  selectGroceriesCategoriesData,
  selectGroceriesStatus,
} from 'features/groceries/groceriesSlice'
import {
  fetchProducts,
  fetchProductsBasket,
  postProductsBasket,
  putProductsBasket,
  selectProductsData,
  selectProductsBasketData,
  selectProductsCategoriesData,
  selectProductsStatus,
} from 'features/products/productsSlice'
import {
  fetchDishes,
  fetchDishesBasket,
  postDishesBasket,
  putDishesBasket,
  selectDishesData,
  selectDishesBasketData,
  selectDishesCategoriesData,
  selectDishesStatus,
} from 'features/dishes/dishesSlice'
import {
  fetchSavedLists,
  fetchSavedListsBasket,
  postSavedListsBasket,
  putSavedListsBasket,
  selectSavedListData,
  selectSavedListBasketData,
  selectSavedListCategoriesData,
  selectSavedListStatus,
} from 'features/savedList/savedListSlice'
import {
  fetchParentCategories,
  selectParentCategoriesData,
  selectParentCategoriesStatus,
} from 'features/parentCategories/parentCategoriesSlice'
import { setActiveMenuIcon } from 'features/activeMenuIcon/activeMenuIconSlice'
import { dataLoadingStatus } from 'hooks/dataLoadingStatus'

const ScrollToParentCategory = ({ category }) => {
  const div = document.querySelector(`#${category}`)

  if (!!div) {
    div.scrollIntoView()
  }
}

function ElementsPage() {
  const dispatch = useDispatch()

  const [fetchGroceriesData, setFetchGroceriesData] = useState(false)
  const [fetchProductsData, setFetchProductsData] = useState(false)
  const [fetchDishesData, setFetchDishesData] = useState(false)
  const [fetchSavedListsData, setFetchSavedListsData] = useState(false)

  useEffect(() => {
    dispatch(setActiveMenuIcon('shop'))
    dispatch(fetchGroceries())
    dispatch(fetchProducts())
    dispatch(fetchDishes())
    dispatch(fetchSavedLists())
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

  const groceriesData = useSelector(selectGroceriesData)
  const groceriesCategoriesData = useSelector(selectGroceriesCategoriesData)
  const groceriesBasketData = useSelector(selectGroceriesBasketData)
  const GroceriesStatus = useSelector(selectGroceriesStatus)

  const productsData = useSelector(selectProductsData)
  const productsCategories = useSelector(selectProductsCategoriesData)
  const productsBasketData = useSelector(selectProductsBasketData)
  const productsStatus = useSelector(selectProductsStatus)

  const dishesData = useSelector(selectDishesData)
  const dishesCategories = useSelector(selectDishesCategoriesData)
  const dishesBasketData = useSelector(selectDishesBasketData)
  const dishesStatus = useSelector(selectDishesStatus)

  const savedListData = useSelector(selectSavedListData)
  const savedListCategories = useSelector(selectSavedListCategoriesData)
  const savedListBasketData = useSelector(selectSavedListBasketData)
  const savedListStatus = useSelector(selectSavedListStatus)

  const parentCategories = useSelector(selectParentCategoriesData)
  const parentCategoriesStatus = useSelector(selectParentCategoriesStatus)

  const data = dataLoadingStatus([
    GroceriesStatus,
    productsStatus,
    dishesStatus,
    savedListStatus,
    parentCategoriesStatus,
  ])

  const category = useSelector(selectCategory)

  ScrollToParentCategory({ category })

  if (data.isError) {
    return 'Fetching data error...'
  }

  if (data.isLoading) {
    return 'Loading data...'
  }

  if (!data.isLoaded) {
    return null
  }

  return (
    <div>
      <EditModeList
        parentsTitle="Groceries"
        itemsList={groceriesData}
        BasketitemsList={groceriesBasketData}
        filtredCategories={groceriesCategoriesData}
        variant="shop"
        parentCategories={parentCategories}
        postItemToBasket={postGroceriesBasket}
        putBasketItem={putGroceriesBasket}
        updateData={setFetchGroceriesData}
      />
      <EditModeList
        parentsTitle="Products"
        itemsList={productsData}
        BasketitemsList={productsBasketData}
        filtredCategories={productsCategories}
        variant="shop"
        parentCategories={parentCategories}
        postItemToBasket={postProductsBasket}
        putBasketItem={putProductsBasket}
        updateData={setFetchProductsData}
      />
      <EditModeList
        parentsTitle="Dishes"
        itemsList={dishesData}
        BasketitemsList={dishesBasketData}
        filtredCategories={dishesCategories}
        variant="shop"
        parentCategories={parentCategories}
        postItemToBasket={postDishesBasket}
        putBasketItem={putDishesBasket}
        updateData={setFetchDishesData}
      />
      <EditModeList
        parentsTitle="SavedList"
        itemsList={savedListData}
        BasketitemsList={savedListBasketData}
        filtredCategories={savedListCategories}
        variant="shop"
        parentCategories={parentCategories}
        postItemToBasket={postSavedListsBasket}
        putBasketItem={putSavedListsBasket}
        updateData={setFetchSavedListsData}
      />
    </div>
  )
}

export default ElementsPage
