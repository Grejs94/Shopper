import React from "react";

import { Switch, Route } from "react-router-dom";

import { useSelector } from "react-redux";

import {
  Menu,
  BottomBarWithIcons,
  PageInfo,
  IconsItem,
  IconsItemLink,
} from "components";

import { ElementsPage } from "pages";

import {
  GroceriesChildren,
  ProductsChildren,
  DishesChildren,
} from "components/IconsItem/Children";

import { MainPageWrapper } from "assets/StyledComponents/MainPageWrapper.css";

import { IconElementsShopItemsPage } from "assets";

import {
  groceries_coloredImg,
  products_coloredImg,
  dishes_coloredImg,
  lists_coloredImg,
  history_coloredImg,
} from "pictures/ParentCategoryIcons";

import { selectCategory } from "features/category/categorySlice";

function ShopPage() {
  const category = useSelector(selectCategory);
  return (
    <>
      <Menu iconElementsList={IconElementsShopItemsPage} activeIcon={"shop"} />
      <PageInfo description={"Shop"} />
      <Switch>
        <MainPageWrapper>
          <Route exact path="/shop">
            <IconsItem image={groceries_coloredImg} text="groceries" />
            {category === "groceries" && (
              <GroceriesChildren to="/shop/elements_page" />
            )}
            <IconsItem image={products_coloredImg} text="products" />
            {category === "products" && (
              <ProductsChildren to="/shop/elements_page" />
            )}
            <IconsItem image={dishes_coloredImg} text="dishes" />
            {category === "dishes" && (
              <DishesChildren to="/shop/elements_page" />
            )}
            <IconsItemLink
              image={lists_coloredImg}
              text="lists"
              to="/shop/elements_page"
            />
            <IconsItemLink
              image={history_coloredImg}
              text="history"
              to="/shop/history"
            />
          </Route>
          <Route exact path="/shop/elements_page">
            <ElementsPage />
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
