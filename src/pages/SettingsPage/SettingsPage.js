import React from "react";

import { Switch, Route } from "react-router-dom";

import { Menu, BottomBarWithIcons, PageInfo, IconsItem } from "components";

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

function SettingsPage() {
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
          <Route exact path="/settings/lists">
            /settings/lists
          </Route>
          <Route exact path="/settings/search">
            /settings/search
          </Route>
          <Route exact path="/settings">
            <IconsItem
              image={groceries_coloredImg}
              text="groceries"
              to="/settings/groceries"
            />
            <IconsItem
              image={products_coloredImg}
              text="products"
              to="/settings/products"
            />
            <IconsItem
              image={dishes_coloredImg}
              text="dishes"
              to="/settings/dishes"
            />
            <IconsItem
              image={lists_coloredImg}
              text="lists"
              to="/settings/lists"
            />
            <IconsItem
              image={history_coloredImg}
              text="history"
              to="/settings/lists"
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
