import React from "react";

import { Switch, Route } from "react-router-dom";

import {
  Menu,
  BottomBarWithIcons,
  PageInfo,
  IconsItem,
  CreateSmartList,
  IconItemWithLinkAndSetCategory,
  IconItemContainer,
} from "components";

import { MainPageWrapper } from "assets/StyledComponents/MainPageWrapper.css";

import { IconElementsShopHelperPage } from "assets";

import { search_coloredImg } from "pictures/ParentCategoryIcons";

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
            <IconItemContainer>
              <IconItemWithLinkAndSetCategory
                image={search_coloredImg}
                text="Create smart list"
                to="/shopHelper/createSmartList"
              />
            </IconItemContainer>
          </Route>
          <Route exact path="/shopHelper/createSmartList">
            <CreateSmartList />
          </Route>
        </Switch>
      </MainPageWrapper>
      <BottomBarWithIcons />
    </>
  );
}
export default HelperPage;
