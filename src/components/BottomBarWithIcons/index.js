import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  list_coloredImg,
  edit_coloredImg,
  return_blackImg,
  return_coloredImg,
  add_blackImg,
  add_coloredImg,
  remove_blackImg,
  remove_coloredImg,
  save_blackImg,
  save_coloredImg,
} from 'pictures'

import * as Styles from './styles'
import {
  selectEditIcon,
  selectAddIcon,
  selectRemoveIcon,
  resetEditIcon,
} from 'features/toggleBottomBarIcons/toggleBottomBarIconsSlice'
import { selectBasketHistory } from 'features/createBasketHistory/createBasketHistorySlice'
import { selectGroceriesBasketData } from 'features/groceries/groceriesSlice'
import { selectProductsBasketData } from 'features/products/productsSlice'
import { selectDishesBasketData } from 'features/dishes/dishesSlice'
import { selectSavedListBasketData } from 'features/savedList/savedListSlice'
import { postHistoryBasket } from 'features/history/historySlice'

function BottomBarWithIcons({ icons, saveIconArray }) {
  const dispatch = useDispatch()
  const history = useHistory()

  const groceriesBasketData = useSelector(selectGroceriesBasketData)
  const productsBasketData = useSelector(selectProductsBasketData)
  const dishesBasketData = useSelector(selectDishesBasketData)
  const savedListBasketData = useSelector(selectSavedListBasketData)

  const editIcon = useSelector(selectEditIcon)
  const addIcon = useSelector(selectAddIcon)
  const removeIcon = useSelector(selectRemoveIcon)
  const BasketHistory = useSelector(selectBasketHistory)

  const basketEmpty =
    groceriesBasketData.length === 0 &&
    productsBasketData.length === 0 &&
    dishesBasketData.length === 0 &&
    savedListBasketData.length === 0

  const handleMouseDownIcon = () => {
    const img = document.querySelector('#returnIcon')

    if (!!img) {
      img.setAttribute('src', return_coloredImg)
    }
  }

  const handleMouseUpIcon = () => {
    const img = document.querySelector('#returnIcon')

    if (!!img) {
      img.setAttribute('src', return_blackImg)
    }
  }

  const resetIcon = (
    <Styles.IconElement>
      <Styles.Img
        id="returnIcon"
        src={return_blackImg}
        onMouseDown={() => handleMouseDownIcon()}
        onMouseUp={() => handleMouseUpIcon()}
        onClick={() => {
          history.goBack()
          dispatch(resetEditIcon())
        }}
      ></Styles.Img>
    </Styles.IconElement>
  )

  const IconSwitch = (icon) => {
    switch (icon) {
      case 'save':
        if (BasketHistory === false) {
          return save_blackImg
        } else {
          return save_coloredImg
        }
      case 'edit':
        if (editIcon === false) {
          return list_coloredImg
        } else {
          return edit_coloredImg
        }
      case 'add':
        if (addIcon === false) {
          return add_blackImg
        } else {
          return add_coloredImg
        }
      case 'remove':
        if (removeIcon === false) {
          return remove_blackImg
        } else {
          return remove_coloredImg
        }

      default:
        return
    }
  }

  const restIconsList =
    icons &&
    icons.map(({ name, onClick }) => (
      <Styles.IconElement
        key={name}
        onClick={() => {
          dispatch(onClick())
        }}
      >
        <Styles.Img src={IconSwitch(name)}></Styles.Img>
      </Styles.IconElement>
    ))

  const saveIcon =
    saveIconArray &&
    saveIconArray.map(({ name, onClick }) => (
      <Styles.IconElement
        key={name}
        onClick={() => {
          if (BasketHistory) {
            return
          } else {
            if (basketEmpty) {
              history.push('/basket/messageWhenEmpty')
            } else {
              dispatch(
                postHistoryBasket({
                  data: {
                    saved: Date.now(),
                    DateToShow: new Date(Date.now())
                      .toLocaleString()
                      .slice(0, 9),
                    groceries: [...groceriesBasketData],
                    products: [...productsBasketData],
                    dishes: [...dishesBasketData],
                    savedLists: [...savedListBasketData],
                  },
                }),
              )

              toast.success(`the shopping list has been added to history `)

              dispatch(onClick())
            }
          }
        }}
      >
        <Styles.Img src={IconSwitch(name)}></Styles.Img>
      </Styles.IconElement>
    ))

  return (
    <Styles.Wrapper>
      <Styles.ContainerReturnIcon>{resetIcon}</Styles.ContainerReturnIcon>
      <Styles.ContainerRestIcons>
        {saveIcon}
        {restIconsList}
      </Styles.ContainerRestIcons>
    </Styles.Wrapper>
  )
}
export default BottomBarWithIcons
