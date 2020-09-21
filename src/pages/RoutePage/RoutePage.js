import React from "react";

import { Menu, BottomBarWithIcons, IconsItemLink } from "components";

import { MainPageWrapper } from "assets/StyledComponents/MainPageWrapper.css";

import { IconElementsRoutePage } from "assets";

function RoutePage() {
  return (
    <>
      <Menu iconElementsList={IconElementsRoutePage} activeIcon={"route"} />
      <MainPageWrapper>
        <IconsItemLink />
      </MainPageWrapper>
      <BottomBarWithIcons />
    </>
  );
}
export default RoutePage;
