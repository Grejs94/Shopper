import React from "react";

import { Switch, Route } from "react-router-dom";

import { Menu, BottomBarWithIcons, PageInfo, IconsItem } from "components";

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
              text="groceries"
              to="/shop/groceries"
            />
            <IconsItem
              image={products_coloredImg}
              text="products"
              to="/shop/products"
            />
            <IconsItem
              image={dishes_coloredImg}
              text="dishes"
              to="/shop/dishes"
            />
            <IconsItem image={lists_coloredImg} text="lists" to="/shop/lists" />
            <IconsItem
              image={history_coloredImg}
              text="history"
              to="/settings/history"
            />
          </Route>
          <Route exact path="/shop/groceries">
            shop/groceries
          </Route>
          <Route exact path="/shop/products">
            shop/products
          </Route>
          <Route exact path="/shop/dishes">
            shop/dishes
          </Route>
          <Route exact path="/shop/lists">
            shop/lists
          </Route>
          <Route exact path="/shop/history">
            shop/lists
          </Route>
        </MainPageWrapper>
      </Switch>

      <BottomBarWithIcons />
    </>
  );
}
export default ShopPage;
