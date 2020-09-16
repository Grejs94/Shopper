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

import { IconElementsSettingsPage } from "assets";

import {
  groceries_coloredImg,
  products_coloredImg,
  dishes_coloredImg,
  lists_coloredImg,
  groceries_blackImg,
  lists_blackImg,
  products_blackImg,
  history_coloredImg,
  history_blackImg,
  search_coloredImg,
  search_blackImg,
} from "pictures/ParentCategoryIcons";

import { setCategory, selectCategory } from "features/category/categorySlice";

function SettingsPage() {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);

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
      <Menu
        iconElementsList={IconElementsSettingsPage}
        activeIcon={"settings"}
      />
      <PageInfo description={"Settings"} />
      <MainPageWrapper>
        <Switch>
          <Route exact path="/settings/groceries">
            /settings/groceries
          </Route>
          <Route exact path="/settings/products">
            /settings/products
          </Route>
          <Route exact path="/settings/dishes">
            /settings/dishes
          </Route>
          <Route exact path="/settings/lists">
            /settings/lists
          </Route>
          <Route exact path="/settings/history">
            /settings/history
          </Route>
          <Route exact path="/settings/search">
            /settings/search
          </Route>
          <Route exact path="/settings">
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

            <IconsItem
              image={lists_coloredImg}
              text="lists"
              to="/settings/lists"
            />
            <IconsItem
              image={history_coloredImg}
              text="history"
              to="/settings/history"
            />
            <IconsItem
              image={search_coloredImg}
              text="search"
              to="/settings/search"
            />
          </Route>
        </Switch>
      </MainPageWrapper>
      <Switch>
        <Route path="/settings">
          <BottomBarWithIcons />
        </Route>
      </Switch>
    </>
  );
}
export default SettingsPage;
