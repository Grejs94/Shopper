import React from "react";

import { Switch, Route } from "react-router-dom";

import { Menu, BottomBarWithIcons, PageInfo, IconsItem } from "components";

import { MainPageWrapper } from "assets/StyledComponents/MainPageWrapper.css";

import { IconElementsShopHelperPage } from "assets";

import {
  lastSearch_coloredImg,
  lastSearch_blackImg,
  search_coloredImg,
  search_blackImg,
} from "pictures/ParentCategoryIcons";

function HelperPage() {
  return (
    <>
      <Menu
        iconElementsList={IconElementsShopHelperPage}
        activeIcon="shopHelper"
      />
      <PageInfo description={"Helper"} />
      <MainPageWrapper>
        <Switch>
          <Route exact path="/shopHelper">
            <IconsItem
              image={lastSearch_coloredImg}
              text="Last smart list"
              to="/shop/smartList"
            />
            <IconsItem
              image={search_coloredImg}
              text="Create smart list"
              to="/shop/CreateSmartList"
            />
          </Route>
        </Switch>
      </MainPageWrapper>
      <BottomBarWithIcons />
    </>
  );
}
export default HelperPage;
