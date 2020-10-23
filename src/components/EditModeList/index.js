import React from 'react'

import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import API from 'api'
import { incrementedString } from 'assets'

import {
  selectAddIcon,
  selectRemoveIcon,
} from 'features/toggleBottomBarIconsSlice/toggleBottomBarIconsSlice'
import { selectActiveMenuIcon } from 'features/activeMenuIcon/activeMenuIconSlice'
import { selectFakeHistory } from 'features/createBasketHistory/createBasketHistorySlice'
import * as Styles from 'assets/StyledComponents/ItemsDisplayed.css'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const EditModeList = ({ parentsTitle, filtredCategories, itemsList }) => {
  const history = useHistory()

  const addIcon = useSelector(selectAddIcon)
  const removeIcon = useSelector(selectRemoveIcon)
  const activeMenuIcon = useSelector(selectActiveMenuIcon)
  const FakeHistory = useSelector(selectFakeHistory)

  const useBasketGroceres = API.useBasketGroceres()
  const useBasketProducts = API.useBasketProducts()
  const useBasketDishes = API.useBasketDishes()
  const useBasketSavedLists = API.useBasketSavedLists()
  const useParentCategories = API.useParentCategories()

  const [mutate_Post_BasketGroceries] = API.useAddBasketGroceries()
  const [mutate_Post_BasketProducts] = API.useAddBasketProducts()
  const [mutate_Post_BasketDishes] = API.useAddBasketDishes()
  const [mutate_Post_BasketSavedLists] = API.useAddBasketSavedLists()

  const [mutate_PUT_BasketGroceries] = API.usePutBasketGroceries()
  const [mutate_PUT_BasketProducts] = API.usePutBasketProducts()
  const [mutate_PUT_BasketDishes] = API.usePutBasketDishes()
  const [mutate_PUT_BasketSavedLists] = API.usePutBasketSavedLists()

  const [mutate_DELETE_BasketGroceries] = API.useDeleteBasketGroceries()
  const [mutate_DELETE_BasketProducts] = API.useDeleteBasketProducts()
  const [mutate_DELETE_BasketDishes] = API.useDeleteBasketDishes()
  const [mutate_DELETE_BasketSavedLists] = API.useDeleteBasketSavedLists()

  if (
    useBasketGroceres.isError ||
    useBasketProducts.isError ||
    useBasketDishes.isError ||
    useBasketSavedLists.isError ||
    useParentCategories.isError
  ) {
    return 'Fetching date error...'
  } else if (
    useBasketGroceres.isLoading ||
    useBasketProducts.isLoading ||
    useBasketDishes.isLoading ||
    useBasketSavedLists.isLoading ||
    useParentCategories.isLoading
  ) {
    return 'Loading date...'
  } else if (
    useBasketGroceres.isSuccess &&
    useBasketProducts.isSuccess &&
    useBasketDishes.isSuccess &&
    useBasketSavedLists.isSuccess &&
    useParentCategories.isSuccess
  ) {
    const handleOnClick = (item) => {
      const index = Number(item.parentCategoryId) - 1
      // need be in correct order
      const elementsLists = [
        useBasketGroceres,
        useBasketProducts,
        useBasketDishes,
        useBasketSavedLists,
      ]

      // need be in correct order
      const mutatePostFunctions = [
        mutate_Post_BasketGroceries,
        mutate_Post_BasketProducts,
        mutate_Post_BasketDishes,
        mutate_Post_BasketSavedLists,
      ]

      // need be in correct order
      const mutatePutFunctions = [
        mutate_PUT_BasketGroceries,
        mutate_PUT_BasketProducts,
        mutate_PUT_BasketDishes,
        mutate_PUT_BasketSavedLists,
      ]

      // need be in correct order
      const mutateDeleteFunctions = [
        mutate_DELETE_BasketGroceries,
        mutate_DELETE_BasketProducts,
        mutate_DELETE_BasketDishes,
        mutate_DELETE_BasketSavedLists,
      ]

      const useBasketElementsList = elementsLists[index]

      const parentCategoryName = useParentCategories.data.find(
        (parentCategory) => parentCategory.id === item.parentCategoryId,
      ).name

      const findElement = useBasketElementsList.data.filter(
        (basketGrocery) => basketGrocery.id === item.id,
      )

      const allreadyInBasket = findElement.length ? true : false

      useParentCategories.data.map((ParentCategory) => {
        if (item.parentCategoryId === ParentCategory.id) {
          if (activeMenuIcon === 'basket') {
            if (addIcon) {
              const basketItem = findElement[0]
              const incrementValue = incrementedString(basketItem.value, '1')

              mutatePutFunctions[index]({
                id: item.id,
                data: {
                  ...basketItem,
                  value: incrementValue,
                },
              })
            }

            if (removeIcon) {
              if (!FakeHistory) {
                history.push('/basket/createBasketHistory')
                return null
              }

              if (item.value > 1) {
                const basketItem = findElement[0]
                const reduced = incrementedString(basketItem.value, '-1')

                mutatePutFunctions[index]({
                  id: item.id,
                  data: {
                    ...basketItem,
                    value: reduced,
                  },
                })
              } else {
                mutateDeleteFunctions[index]({
                  id: item.id,
                })
              }
            }
          } else if (
            activeMenuIcon === 'shop' ||
            activeMenuIcon === 'shopHelper'
          ) {
            if (allreadyInBasket) {
              const basketItem = findElement[0]
              const incrementValue = incrementedString(basketItem.value, '1')

              mutatePutFunctions[index]({
                id: item.id,
                data: {
                  ...basketItem,
                  value: incrementValue,
                },
              }).then(
                toast.success(
                  `The ${parentCategoryName}: "${item.name}" 
                  current value is ${incrementValue}`,
                ),
              )
            } else {
              mutatePostFunctions[index]({
                data: {
                  ...item,
                  value: '1',
                },
              }).then(
                toast.success(
                  `The ${parentCategoryName}: "${item.name}" has been successfully added to your basket`,
                ),
              )
            }
          }
        } else {
          return null
        }
        return null
      })
    }

    return (
      <div>
        {itemsList.length > 0 ? (
          <>
            {parentsTitle !== 'Groceries' ? (
              <Styles.HideTheMenuWhenScrollIntoView id={parentsTitle} />
            ) : null}
            <Styles.ParentTitle>{parentsTitle}</Styles.ParentTitle>
          </>
        ) : null}
        {filtredCategories.map((category) => {
          const ItemsList = itemsList.filter(
            (item) => item.categoryId === category.id,
          )

          if (ItemsList.length === 0) {
            return null
          }

          return (
            <div key={category.name}>
              <Styles.CategoryTitle>
                {capitalizeFirstLetter(category.name)}
              </Styles.CategoryTitle>
              <Styles.SquareContainer>
                {ItemsList.map((item) => {
                  return (
                    <Styles.Square
                      key={item.id}
                      onClick={() => handleOnClick(item)}
                    >
                      <Styles.Content>
                        {item.value === '1' || item.value === undefined
                          ? `${item.name}`
                          : `${item.name} (${item.value})`}
                      </Styles.Content>
                    </Styles.Square>
                  )
                })}
              </Styles.SquareContainer>
            </div>
          )
        })}
      </div>
    )
  }
}

export default EditModeList
