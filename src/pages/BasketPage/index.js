import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { Menu, BottomBarWithIcons, PageInfo, Modal } from 'components'
import {
  IconElementsBasketPage,
  IconsBottomEditVariant,
  IconsBottomListVariant,
  saveIconArray,
} from 'assets'

import { BasketPageContent } from './components'
import * as Styles2 from 'assets/StyledComponents/MainPageWrapper.css'
import { selectEditIcon } from 'features/toggleBottomBarIconsSlice/toggleBottomBarIconsSlice'

function BasketPage() {
  const editMode = useSelector(selectEditIcon)

  return (
    <>
      <Menu iconElementsList={IconElementsBasketPage} activeIcon="basket" />
      <PageInfo description={'Basket'} />
      <Styles2.MainPageWrapper>
        <BasketPageContent />
      </Styles2.MainPageWrapper>
      <Switch>
        <Route path="/basket/messageWhenEmpty">
          <Modal message="You cannot send purchase history if the shopping cart is empty"></Modal>
        </Route>
      </Switch>
      <BottomBarWithIcons
        icons={editMode ? IconsBottomEditVariant : IconsBottomListVariant}
        saveIconArray={saveIconArray}
      />
    </>
  )
}
export default BasketPage
