import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { EditModeList, ListModeList, Modal } from 'components'

import CreateHistoryModalContent from 'components/ModalsContent/CreateHistoryModalContent'
import * as Styles from './styles'
import { selectEditIcon } from 'features/toggleBottomBarIcons/toggleBottomBarIconsSlice'
import {
  fetchGroceries,
  fetchGroceriesBasket,
  postGroceriesBasket,
  putGroceriesBasket,
  deleteGroceriesBasket,
  selectGroceriesBasketData,
  selectGroceriesCategoriesData,
  selectGroceriesStatus,
} from 'features/groceries/groceriesSlice'
import {
  fetchProducts,
  fetchProductsBasket,
  postProductsBasket,
  putProductsBasket,
  deleteProductsBasket,
  selectProductsBasketData,
  selectProductsCategoriesData,
  selectProductsStatus,
} from 'features/products/productsSlice'
import {
  fetchDishes,
  fetchDishesBasket,
  postDishesBasket,
  putDishesBasket,
  deleteDishesBasket,
  selectDishesBasketData,
  selectDishesCategoriesData,
  selectDishesStatus,
} from 'features/dishes/dishesSlice'
import {
  fetchSavedLists,
  fetchSavedListsBasket,
  postSavedListsBasket,
  putSavedListsBasket,
  deleteSavedListsBasket,
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

const BasketPageContent = () => {
  const dispatch = useDispatch()

  const [fetchGroceriesData, setFetchGroceriesData] = useState(false)
  const [fetchProductsData, setFetchProductsData] = useState(false)
  const [fetchDishesData, setFetchDishesData] = useState(false)
  const [fetchSavedListsData, setFetchSavedListsData] = useState(false)

  useEffect(() => {
    dispatch(setActiveMenuIcon('basket'))
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

  const editMode = useSelector(selectEditIcon)

  const groceriesCategoriesData = useSelector(selectGroceriesCategoriesData)
  const groceriesBasketData = useSelector(selectGroceriesBasketData)
  const GroceriesStatus = useSelector(selectGroceriesStatus)

  const productsCategories = useSelector(selectProductsCategoriesData)
  const productsBasketData = useSelector(selectProductsBasketData)
  const productsStatus = useSelector(selectProductsStatus)

  const dishesCategories = useSelector(selectDishesCategoriesData)
  const dishesBasketData = useSelector(selectDishesBasketData)
  const dishesStatus = useSelector(selectDishesStatus)

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

  if (data.isError) {
    return 'Fetching data error...'
  }

  if (data.isLoading) {
    return 'Loading data...'
  }

  if (!data.isLoaded) {
    return null
  }

  const basketEmpty =
    groceriesBasketData.length === 0 &&
    productsBasketData.length === 0 &&
    dishesBasketData.length === 0 &&
    savedListBasketData.length === 0

  const messege = <Styles.Message>Your basket is empty!</Styles.Message>

  return basketEmpty ? (
    messege
  ) : editMode ? (
    <div>
      <EditModeList
        parentsTitle="Groceries"
        itemsList={groceriesBasketData}
        BasketitemsList={groceriesBasketData}
        filtredCategories={groceriesCategoriesData}
        parentCategories={parentCategories}
        postItemToBasket={postGroceriesBasket}
        putBasketItem={putGroceriesBasket}
        deleteBasketItem={deleteGroceriesBasket}
        updateData={setFetchGroceriesData}
      />
      <EditModeList
        parentsTitle="Products"
        itemsList={productsBasketData}
        BasketitemsList={productsBasketData}
        filtredCategories={productsCategories}
        parentCategories={parentCategories}
        postItemToBasket={postProductsBasket}
        putBasketItem={putProductsBasket}
        deleteBasketItem={deleteProductsBasket}
        updateData={setFetchProductsData}
      />
      <EditModeList
        parentsTitle="Dishes"
        itemsList={dishesBasketData}
        BasketitemsList={dishesBasketData}
        filtredCategories={dishesCategories}
        parentCategories={parentCategories}
        postItemToBasket={postDishesBasket}
        putBasketItem={putDishesBasket}
        deleteBasketItem={deleteDishesBasket}
        updateData={setFetchDishesData}
      />
      <EditModeList
        parentsTitle="SavedList"
        itemsList={savedListBasketData}
        BasketitemsList={savedListBasketData}
        filtredCategories={savedListCategories}
        parentCategories={parentCategories}
        postItemToBasket={postSavedListsBasket}
        putBasketItem={putSavedListsBasket}
        deleteBasketItem={deleteSavedListsBasket}
        updateData={setFetchSavedListsData}
      />
      <Switch>
        <Route path="/basket/createBasketHistory">
          <Modal>
            <CreateHistoryModalContent />
          </Modal>
        </Route>
      </Switch>
    </div>
  ) : (
    <div>
      <ListModeList
        parentsTitle="Groceries"
        itemsList={groceriesBasketData}
        filtredCategories={groceriesCategoriesData}
      />
      <ListModeList
        parentsTitle="Products"
        itemsList={productsBasketData}
        filtredCategories={productsCategories}
      />
      <ListModeList
        parentsTitle="Dishes"
        itemsList={dishesBasketData}
        filtredCategories={dishesCategories}
      />
      <ListModeList
        parentsTitle="SavedList"
        itemsList={savedListBasketData}
        filtredCategories={savedListCategories}
      />
    </div>
  )
}

export default BasketPageContent
