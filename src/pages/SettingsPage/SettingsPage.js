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
import {
  GroceriesChildren,
  ProductsChildren,
  DishesChildren,
} from "components/IconsItem/Children";
import { IconElementsSettingsPage } from "assets";

import { MainPageWrapper } from "assets/StyledComponents/MainPageWrapper.css";

import {
  groceries_coloredImg,
  products_coloredImg,
  dishes_coloredImg,
  lists_coloredImg,
  history_coloredImg,
} from "pictures/ParentCategoryIcons";

import { selectCategory } from "features/category/categorySlice";

function SettingsPage() {
  const category = useSelector(selectCategory);

  return (
    <>
      <Menu
        iconElementsList={IconElementsSettingsPage}
        activeIcon={"settings"}
      />
      <PageInfo description={"Settings"} />
      <MainPageWrapper>
        <Switch>
          <Route exact path="/settings">
            <IconsItem image={groceries_coloredImg} text="groceries" />
            {category === "groceries" && (
              <GroceriesChildren to="/settings/groceries" />
            )}
            <IconsItem image={products_coloredImg} text="products" />
            {category === "products" && (
              <ProductsChildren to="/settings/products" />
            )}
            <IconsItem image={dishes_coloredImg} text="dishes" />
            {category === "dishes" && <DishesChildren to="/settings/dishes" />}
            <IconsItemLink
              image={lists_coloredImg}
              text="lists"
              to="/settings/lists"
            />
            <IconsItemLink
              image={history_coloredImg}
              text="history"
              to="/settings/history"
            />
          </Route>
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
