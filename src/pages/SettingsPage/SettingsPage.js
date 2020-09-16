import React from "react";

import { Switch, Route } from "react-router-dom";

import { Menu, BottomBarWithIcons } from "components";

import { MainPageWrapper } from "assets/StyledComponents/MainPageWrapper.css";

import { IconElementsSettingsPage } from "assets";

function SettingsPage() {
  return (
    <>
      <Menu
        iconElementsList={IconElementsSettingsPage}
        activeIcon={"settings"}
      />
      <MainPageWrapper>SettingsPage</MainPageWrapper>
      <Switch>
        <Route path="/settings">
          <BottomBarWithIcons />
        </Route>
      </Switch>
    </>
  );
}
export default SettingsPage;
