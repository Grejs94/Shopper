import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  selectGroceriesBasketData,
  selectGroceriesStatus,
} from 'features/groceries/groceriesSlice'
import {
  selectProductsBasketData,
  selectProductsStatus,
} from 'features/products/productsSlice'
import {
  selectDishesBasketData,
  selectDishesStatus,
} from 'features/dishes/dishesSlice'
import {
  selectSavedListBasketData,
  selectSavedListStatus,
} from 'features/savedList/savedListSlice'
import { postHistoryBasket } from 'features/history/historySlice'

import {
  setBasketHistory,
  setFakeHistory,
} from 'features/createBasketHistory/createBasketHistorySlice'
import { dataLoadingStatus } from 'hooks/dataLoadingStatus'
import * as Styles from './styles'

const CreateHistoryModalContent = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const GroceriesBasket = useSelector(selectGroceriesBasketData)
  const ProductsBasket = useSelector(selectProductsBasketData)
  const DishesBasket = useSelector(selectDishesBasketData)
  const SavedListBasket = useSelector(selectSavedListBasketData)

  const GroceriesStatus = useSelector(selectGroceriesStatus)
  const productsStatus = useSelector(selectProductsStatus)
  const dishesStatus = useSelector(selectDishesStatus)
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

  return (
    <Styles.Wrapper>
      <Styles.Info>Do you want to save your shopping list?</Styles.Info>
      <Styles.ButtonContainer>
        <Styles.Button
          onClick={() => {
            dispatch(setBasketHistory())
            console.log('sdf')
            dispatch(
              postHistoryBasket({
                data: {
                  saved: new Date(),
                  groceries: [...GroceriesBasket],
                  products: [...ProductsBasket],
                  dishes: [...DishesBasket],
                  savedLists: [...SavedListBasket],
                },
              }),
            )

            toast.success(`the shopping list has been added to history `)
            history.goBack()
          }}
        >
          yes, save my list
        </Styles.Button>
        <Styles.Button
          onClick={() => {
            dispatch(setFakeHistory())
            history.goBack()
          }}
        >
          no, skip that.
        </Styles.Button>
      </Styles.ButtonContainer>
    </Styles.Wrapper>
  )
}

export default CreateHistoryModalContent
