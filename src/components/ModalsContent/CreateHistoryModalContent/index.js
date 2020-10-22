import React from 'react'

import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  setBasketHistory,
  setFakeHistory,
} from 'features/createBasketHistory/createBasketHistorySlice'

import API from 'API'

import * as Styles from './styles'

const CreateHistoryModalContent = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const useBasketGroceres = API.useBasketGroceres()
  const useBasketProducts = API.useBasketProducts()
  const useBasketDishes = API.useBasketDishes()
  const useBasketSavedLists = API.useBasketSavedLists()

  const [mutate_Post_History] = API.useAddHistory()
  if (
    useBasketGroceres.isError ||
    useBasketProducts.isError ||
    useBasketDishes.isError ||
    useBasketSavedLists.isError
  ) {
    return 'Fetching date error...'
  } else if (
    useBasketGroceres.isLoading ||
    useBasketProducts.isLoading ||
    useBasketDishes.isLoading ||
    useBasketSavedLists.isLoading
  ) {
    return 'Loading date...'
  } else if (
    useBasketGroceres.isSuccess &&
    useBasketProducts.isSuccess &&
    useBasketDishes.isSuccess &&
    useBasketSavedLists.isSuccess
  ) {
    return (
      <Styles.Wrapper>
        <Styles.Info>Do you want to save your shopping list?</Styles.Info>
        <Styles.ButtonContainer>
          <Styles.Button
            onClick={() => {
              dispatch(setBasketHistory())
              mutate_Post_History({
                data: {
                  saved: new Date(),
                  groceries: [...useBasketGroceres.data],
                  products: [...useBasketProducts.data],
                  dishes: [...useBasketDishes.data],
                  savedLists: [...useBasketSavedLists.data],
                },
              }).then(
                toast.success(`the shopping list has been added to history `),
              )
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
}

export default CreateHistoryModalContent
