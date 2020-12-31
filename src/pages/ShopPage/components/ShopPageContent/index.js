import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { EditModeList } from 'components'

import { itemsDataStatus } from 'features/allDataState'
import { selectCategory } from 'features/category/categorySlice'
import {
  fetchGroceries,
  fetchGroceriesBasket,
  postGroceriesBasket,
  putGroceriesBasket,
  selectGroceriesData,
  selectGroceriesBasketData,
  selectGroceriesCategoriesData,
} from 'features/groceries/groceriesSlice'
import {
  fetchProducts,
  fetchProductsBasket,
  postProductsBasket,
  putProductsBasket,
  selectProductsData,
  selectProductsBasketData,
  selectProductsCategoriesData,
} from 'features/products/productsSlice'
import {
  fetchDishes,
  fetchDishesBasket,
  postDishesBasket,
  putDishesBasket,
  selectDishesData,
  selectDishesBasketData,
  selectDishesCategoriesData,
} from 'features/dishes/dishesSlice'
import {
  fetchSavedLists,
  fetchSavedListsBasket,
  postSavedListsBasket,
  putSavedListsBasket,
  selectSavedListData,
  selectSavedListBasketData,
  selectSavedListCategoriesData,
} from 'features/savedList/savedListSlice'
import {
  fetchParentCategories,
  selectParentCategoriesData,
} from 'features/parentCategories/parentCategoriesSlice'
import { setActiveMenuIcon } from 'features/activeMenuIcon/activeMenuIconSlice'

const ScrollToParentCategory = ({ category }) => {
  const div = document.querySelector(`#${category}`)

  if (!!div) {
    div.scrollIntoView()
  }
}

function ElementsPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setActiveMenuIcon('shop'))
    dispatch(fetchGroceries())
    dispatch(fetchProducts())
    dispatch(fetchDishes())
    dispatch(fetchSavedLists())
    dispatch(fetchParentCategories())
    dispatch(fetchGroceriesBasket())
    dispatch(fetchProductsBasket())
    dispatch(fetchDishesBasket())
    dispatch(fetchSavedListsBasket())
  }, [dispatch])

  const groceriesData = useSelector(selectGroceriesData)
  const groceriesCategoriesData = useSelector(selectGroceriesCategoriesData)
  const groceriesBasketData = useSelector(selectGroceriesBasketData)

  const productsData = useSelector(selectProductsData)
  const productsCategories = useSelector(selectProductsCategoriesData)
  const productsBasketData = useSelector(selectProductsBasketData)

  const dishesData = useSelector(selectDishesData)
  const dishesCategories = useSelector(selectDishesCategoriesData)
  const dishesBasketData = useSelector(selectDishesBasketData)

  const savedListData = useSelector(selectSavedListData)
  const savedListCategories = useSelector(selectSavedListCategoriesData)
  const savedListBasketData = useSelector(selectSavedListBasketData)

  const parentCategories = useSelector(selectParentCategoriesData)

  const data = useSelector(itemsDataStatus)

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
      />
    </div>
  )
}

export default ElementsPage
