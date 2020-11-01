import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { EditModeList, ListModeList, Modal } from 'components'

import CreateHistoryModalContent from 'components/ModalsContent/CreateHistoryModalContent'
import * as Styles from './styles'
import { itemsDataStatus } from 'features/allDataState'
import { selectEditIcon } from 'features/toggleBottomBarIcons/toggleBottomBarIconsSlice'
import {
  fetchGroceries,
  fetchGroceriesBasket,
  postGroceriesBasket,
  putGroceriesBasket,
  deleteGroceriesBasket,
  selectGroceriesBasketData,
  selectGroceriesCategoriesData,
} from 'features/groceries/groceriesSlice'
import {
  fetchProducts,
  fetchProductsBasket,
  postProductsBasket,
  putProductsBasket,
  deleteProductsBasket,
  selectProductsBasketData,
  selectProductsCategoriesData,
} from 'features/products/productsSlice'
import {
  fetchDishes,
  fetchDishesBasket,
  postDishesBasket,
  putDishesBasket,
  deleteDishesBasket,
  selectDishesBasketData,
  selectDishesCategoriesData,
} from 'features/dishes/dishesSlice'
import {
  fetchSavedLists,
  fetchSavedListsBasket,
  postSavedListsBasket,
  putSavedListsBasket,
  deleteSavedListsBasket,
  selectSavedListBasketData,
  selectSavedListCategoriesData,
} from 'features/savedList/savedListSlice'
import {
  fetchParentCategories,
  selectParentCategoriesData,
} from 'features/parentCategories/parentCategoriesSlice'
import { setActiveMenuIcon } from 'features/activeMenuIcon/activeMenuIconSlice'

const BasketPageContent = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setActiveMenuIcon('basket'))
    dispatch(fetchGroceries())
    dispatch(fetchProducts())
    dispatch(fetchDishes())
    dispatch(fetchSavedLists())
    dispatch(fetchParentCategories())
  }, [dispatch])

  const editMode = useSelector(selectEditIcon)

  const groceriesCategoriesData = useSelector(selectGroceriesCategoriesData)
  const groceriesBasketData = useSelector(selectGroceriesBasketData)

  const productsCategories = useSelector(selectProductsCategoriesData)
  const productsBasketData = useSelector(selectProductsBasketData)

  const dishesCategories = useSelector(selectDishesCategoriesData)
  const dishesBasketData = useSelector(selectDishesBasketData)

  const savedListCategories = useSelector(selectSavedListCategoriesData)
  const savedListBasketData = useSelector(selectSavedListBasketData)

  const parentCategories = useSelector(selectParentCategoriesData)

  const data = useSelector(itemsDataStatus)

  if (data.isError) {
    return 'Fetching data error...'
  }

  if (data.isLoading) {
    return 'Loading data...'
  }

  if (!data.isLoaded) {
    return null
  }

  return data.isBasketEmpty ? (
    <Styles.Message>Your basket is empty!</Styles.Message>
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
        updateData={() => dispatch(fetchGroceriesBasket())}
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
        updateData={() => dispatch(fetchProductsBasket())}
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
        updateData={() => dispatch(fetchDishesBasket())}
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
        updateData={() => dispatch(fetchSavedListsBasket())}
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
