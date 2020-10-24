import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { EditModeList, ListModeList, Modal } from 'components'

import CreateHistoryModalContent from 'components/ModalsContent/CreateHistoryModalContent'
import * as Styles from './styles'
import { selectEditIcon } from 'features/toggleBottomBarIcons/toggleBottomBarIconsSlice'
import {
  fetchGroceries,
  selectGroceriesBasketData,
  selectGroceriesCategoriesData,
  selectGroceriesStatus,
} from 'features/groceries/groceriesSlice'
import {
  fetchProducts,
  selectProductsBasketData,
  selectProductsCategoriesData,
  selectProductsStatus,
} from 'features/products/productsSlice'
import {
  fetchDishes,
  selectDishesBasketData,
  selectDishesCategoriesData,
  selectDishesStatus,
} from 'features/dishes/dishesSlice'
import {
  fetchSavedLists,
  selectSavedListBasketData,
  selectSavedListCategoriesData,
  selectSavedListStatus,
} from 'features/savedList/savedListSlice'
import { dataLoadingStatus } from 'hooks/dataLoadingStatus'

const BasketPageContent = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchGroceries())
    dispatch(fetchProducts())
    dispatch(fetchDishes())
    dispatch(fetchSavedLists())
  }, [dispatch])
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

  const data = dataLoadingStatus([
    GroceriesStatus,
    productsStatus,
    dishesStatus,
    savedListStatus,
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
        filtredCategories={groceriesCategoriesData}
      />
      <EditModeList
        parentsTitle="Products"
        itemsList={productsBasketData}
        filtredCategories={productsCategories}
      />
      <EditModeList
        parentsTitle="Dishes"
        itemsList={dishesBasketData}
        filtredCategories={dishesCategories}
      />
      <EditModeList
        parentsTitle="SavedList"
        itemsList={savedListBasketData}
        filtredCategories={savedListCategories}
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
