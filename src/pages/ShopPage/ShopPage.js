import React from "react";

import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Menu,
  BottomBarWithIcons,
  PageInfo,
  IconsItem,
  IconsChildren,
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

import { setCategory, selectCategory } from "features/category/categorySlice";

function ShopPage() {
  const category = useSelector(selectCategory);
  const dispatch = useDispatch();

  const groceriesChildrens = (
    <>
      <IconsChildren text="- vegetables" />
      <IconsChildren text="- fruits" />
      <IconsChildren text="- pastries" />
      <IconsChildren text="- dairy" />
    </>
  );

  const productsChildrens = (
    <>
      <IconsChildren text="- product cat 1" />
      <IconsChildren text="- product cat 2" />
      <IconsChildren text="- product cat 3" />
      <IconsChildren text="- product cat 4" />
    </>
  );

  const dishesChildrens = (
    <>
      <IconsChildren text="- dishes cat 1" />
      <IconsChildren text="- dishes cat 2" />
      <IconsChildren text="- dishes cat 3" />
      <IconsChildren text="- dishes cat 4" />
    </>
  );

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
              handle={() => dispatch(setCategory("groceries"))}
            />
            {category === "groceries" && groceriesChildrens}
            <IconsItem
              image={products_coloredImg}
              text="products"
              handle={() => dispatch(setCategory("products"))}
            />
            {category === "products" && productsChildrens}
            <IconsItem
              image={dishes_coloredImg}
              text="dishes"
              handle={() => dispatch(setCategory("dishes"))}
            />
            {category === "dishes" && dishesChildrens}
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
