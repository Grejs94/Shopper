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
} from "pictures/ParentCategoryIcons";

function ShopPage() {
  return (
    <>
      <Menu iconElementsList={IconElementsShopItemsPage} activeIcon={"shop"} />
      <PageInfo description={"Shop"} />
      <Switch>
        <Route exact path="/shop">
          <MainPageWrapper>
            <IconsItem
              image={groceries_coloredImg}
              text="groceries"
              to="/shop/groceries"
            />
            <IconsItem
              image={products_coloredImg}
              text="products"
              to="/shop/groceries"
            />
            <IconsItem
              image={dishes_coloredImg}
              text="dishes"
              to="/shop/dishes"
            />
            <IconsItem image={lists_coloredImg} text="lists" to="/shop/lists" />
          </MainPageWrapper>
        </Route>
        <Route exact path="/shop/groceries">
          <MainPageWrapper>shop/groceries</MainPageWrapper>
        </Route>
        <Route exact path="/shop/products">
          <MainPageWrapper>shop/products</MainPageWrapper>
        </Route>
        <Route exact path="/shop/dishes">
          <MainPageWrapper>shop/dishes</MainPageWrapper>
        </Route>
        <Route exact path="/shop/lists">
          <MainPageWrapper>shop/lists</MainPageWrapper>
        </Route>
      </Switch>

      <BottomBarWithIcons />
    </>
  );
}
export default ShopPage;
