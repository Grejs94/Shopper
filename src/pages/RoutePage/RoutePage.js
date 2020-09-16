import React from "react";

import { Menu, BottomBarWithIcons } from "components";

import { MainPageWrapper } from "assets/StyledComponents/MainPageWrapper.css";

import { IconElementsRoutePage } from "assets";

function RoutePage() {
  return (
    <>
      <Menu iconElementsList={IconElementsRoutePage} activeIcon={"route"} />
      <MainPageWrapper>RoutePage</MainPageWrapper>
      <BottomBarWithIcons />
    </>
  );
}
export default RoutePage;
