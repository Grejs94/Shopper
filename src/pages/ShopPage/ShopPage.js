import React from "react";

import { Switch, Route } from "react-router-dom";

import {
  Menu,
  BottomBarWithIcons,
  PageInfo,
  IconsItem,
  IconsItemLink,
  ShopPageContent,
} from "components";

import { MainPageWrapper } from "assets/StyledComponents/MainPageWrapper.css";

import { IconElementsShopItemsPage } from "assets";

import {
  groceries_coloredImg,
  products_coloredImg,
  dishes_coloredImg,
  lists_coloredImg,
  history_coloredImg,
} from "pictures/ParentCategoryIcons";

function ShopPage() {
  return (
    <>
      <Menu iconElementsList={IconElementsShopItemsPage} activeIcon={"shop"} />
      <PageInfo description={"Shop"} />
      <Switch>
        <MainPageWrapper>
          <Route exact path="/shop">
            <IconsItem
              image={groceries_coloredImg}
              text="Groceries"
              to="/shop/elements_page"
            />
            <IconsItem
              image={products_coloredImg}
              text="Products"
              to="/shop/elements_page"
            />
            <IconsItem
              image={dishes_coloredImg}
              text="Dishes"
              to="/shop/elements_page"
            />

            <IconsItem
              image={lists_coloredImg}
              text="SavedList"
              to="/shop/elements_page"
            />
            <IconsItemLink
              image={history_coloredImg}
              text="History"
              to="/shop/history"
            />
          </Route>
          <Route exact path="/shop/elements_page">
            <ShopPageContent />
          </Route>
          <Route exact path="/shop/history">
            shop/history
          </Route>
        </MainPageWrapper>
      </Switch>

      <BottomBarWithIcons />
    </>
  );
}
export default ShopPage;
