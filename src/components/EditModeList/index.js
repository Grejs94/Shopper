import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { incrementedString } from 'assets'

import {
  selectAddIcon,
  selectRemoveIcon,
} from 'features/toggleBottomBarIcons/toggleBottomBarIconsSlice'
import {
  selectActiveMenuIcon,
  setActiveMenuIcon,
} from 'features/activeMenuIcon/activeMenuIconSlice'
import { selectFakeHistory } from 'features/createBasketHistory/createBasketHistorySlice'
import * as Styles from 'assets/StyledComponents/ItemsDisplayed.css'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const EditModeList = ({
  parentsTitle,
  filtredCategories,
  itemsList,
  variant = '',
  BasketitemsList = [],
  parentCategories = [],
  postItemToBasket = () => {},
  putBasketItem = () => {},
  deleteBasketItem = () => {},
  updateData = () => {},
}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [fetchData, setFetchData] = useState(false)

  useEffect(() => {
    if (variant === 'shop') {
      activeMenuIcon = dispatch(setActiveMenuIcon('shop'))
    } else if (variant === '') {
      activeMenuIcon = dispatch(setActiveMenuIcon('basket'))
    }
  }, [])

  useEffect(() => {
    dispatch(updateData())
  }, [dispatch, fetchData])

  const addIcon = useSelector(selectAddIcon)
  const removeIcon = useSelector(selectRemoveIcon)
  let activeMenuIcon = useSelector(selectActiveMenuIcon)
  const FakeHistory = useSelector(selectFakeHistory)

  const handleOnClick = (item) => {
    const handlePutBasketItem = (basketItem, valueChangeFunction) => {
      dispatch(
        putBasketItem({
          id: item.id,
          data: {
            ...basketItem,
            value: valueChangeFunction,
          },
        }),
      )

      toast.success(
        `The ${parentsTitle}: "${item.name}" 
        current value is ${valueChangeFunction}`,
      )

      setFetchData((old) => !old)
    }

    const findElement = BasketitemsList.filter(
      (basketGrocery) => basketGrocery.id === item.id,
    )

    const allreadyInBasket = findElement.length ? true : false

    parentCategories.map((ParentCategory) => {
      if (item.parentCategoryId === ParentCategory.id) {
        if (activeMenuIcon === 'basket') {
          if (addIcon) {
            const basketItem = findElement[0]
            const incrementValue = incrementedString(basketItem.value, '1')

            handlePutBasketItem(basketItem, incrementValue)
          }

          if (removeIcon) {
            if (!FakeHistory) {
              history.push('/basket/createBasketHistory')
              return null
            }

            if (item.value > 1) {
              const basketItem = findElement[0]
              console.log(basketItem)
              const reduced = incrementedString(basketItem.value, '-1')

              handlePutBasketItem(basketItem, reduced)
            } else {
              dispatch(
                deleteBasketItem({
                  id: item.id,
                }),
              )

              setFetchData((old) => !old)
            }
          }
        } else if (
          activeMenuIcon === 'shop' ||
          activeMenuIcon === 'shopHelper'
        ) {
          if (allreadyInBasket) {
            const basketItem = findElement[0]
            const incrementValue = incrementedString(basketItem.value, '1')

            handlePutBasketItem(basketItem, incrementValue)
          } else {
            dispatch(
              postItemToBasket({
                data: {
                  ...item,
                  value: '1',
                },
              }),
            )

            toast.success(
              `The ${parentsTitle}: "${item.name}" has been successfully added to your basket`,
            )

            setFetchData((old) => !old)
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

export default EditModeList