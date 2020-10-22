import React from 'react'

import { Switch, Route } from 'react-router-dom'

import {
  Menu,
  BottomBarWithIcons,
  PageInfo,
  ShopPageContent,
  HistoryContent,
  IconItemContainer,
  IconItemWithLink,
  IconItemWithLinkAndSetCategory,
} from 'components'

import * as Styles from 'assets/StyledComponents/MainPageWrapper.css'

import { IconElementsShopItemsPage } from 'assets'

import {
  groceries_coloredImg,
  products_coloredImg,
  dishes_coloredImg,
  lists_coloredImg,
  history_coloredImg,
} from 'pictures/ParentCategoryIcons'

function ShopPage() {
  return (
    <>
      <Menu iconElementsList={IconElementsShopItemsPage} activeIcon={'shop'} />
      <PageInfo description={'Shop'} />
      <Switch>
        <Styles.MainPageWrapper>
          <Route exact path="/shop">
            <IconItemContainer>
              <IconItemWithLinkAndSetCategory
                image={groceries_coloredImg}
                text="Groceries"
                to="/shop/elements_page"
              />
            </IconItemContainer>
            <IconItemContainer>
              <IconItemWithLinkAndSetCategory
                image={products_coloredImg}
                text="Products"
                to="/shop/elements_page"
              />
            </IconItemContainer>
            <IconItemContainer>
              <IconItemWithLinkAndSetCategory
                image={dishes_coloredImg}
                text="Dishes"
                to="/shop/elements_page"
              />
            </IconItemContainer>
            <IconItemContainer>
              <IconItemWithLinkAndSetCategory
                image={lists_coloredImg}
                text="SavedList"
                to="/shop/elements_page"
              />
            </IconItemContainer>
            <IconItemContainer>
              <IconItemWithLink
                image={history_coloredImg}
                text="History"
                to="/shop/history"
              />
            </IconItemContainer>
          </Route>
          <Route exact path="/shop/elements_page">
            <ShopPageContent />
          </Route>
          <Route exact path="/shop/history">
            <HistoryContent />
          </Route>
        </Styles.MainPageWrapper>
      </Switch>

      <BottomBarWithIcons />
    </>
  )
}
export default ShopPage
