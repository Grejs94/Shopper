import React from "react";

import { Menu, BottomBarWithIcons } from "components";

import { MainPageWrapper } from "assets/StyledComponents/MainPageWrapper.css";

import { IconElementsShopHelperPage } from "assets";

function HelperPage() {
  return (
    <>
      <Menu
        iconElementsList={IconElementsShopHelperPage}
        activeIcon="shopHelper"
      />
      <MainPageWrapper>HelperPage</MainPageWrapper>
      <BottomBarWithIcons />
    </>
  );
}
export default HelperPage;
