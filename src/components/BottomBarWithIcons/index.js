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
  const basketHistory = useSelector(selectBasketHistory)

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

  const handleSaveIcon = (onClick) => {
    if (basketHistory) {
      return
    }

    if (basketEmpty) {
      history.push('/basket/messageWhenEmpty')
      return
    }

    dispatch(
      postHistoryBasket({
        data: {
          saved: Date.now(),
          DateToShow: new Date(Date.now()).toLocaleString().slice(0, 9),
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

  const iconSelect = {
    save: basketHistory ? save_coloredImg : save_blackImg,
    edit: editIcon ? edit_coloredImg : list_coloredImg,
    add: addIcon ? add_coloredImg : add_blackImg,
    remove: removeIcon ? remove_coloredImg : remove_blackImg,
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
        <Styles.Img src={iconSelect[name]}></Styles.Img>
      </Styles.IconElement>
    ))

  const saveIcon =
    saveIconArray &&
    saveIconArray.map(({ name, onClick }) => (
      <Styles.IconElement key={name} onClick={() => handleSaveIcon(onClick)}>
        <Styles.Img src={iconSelect[name]}></Styles.Img>
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
