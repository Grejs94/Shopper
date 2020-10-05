import React from "react";

import { Switch, Route } from "react-router-dom";

import {
  Menu,
  BottomBarWithIcons,
  PageInfo,
  SettingsHelperContent,
  IconsItemLink,
} from "components";

import { IconElementsSettingsPage } from "assets";

import { shopHelper_coloredImg } from "pictures";

import { MainPageWrapper } from "assets/StyledComponents/MainPageWrapper.css";

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
          <Route exact path="/settings">
            <IconsItemLink
              image={shopHelper_coloredImg}
              text="Helper"
              to="/settings/helper"
            />
          </Route>
          <Route exact path="/settings/helper">
            <SettingsHelperContent />
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
