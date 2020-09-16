import React from "react";

import { Menu, BottomBarWithIcons } from "components";

import { MainPageWrapper } from "assets/StyledComponents/MainPageWrapper.css";

import { IconElementsShopItemsPage } from "assets";

function ShopPage() {
  return (
    <>
      <Menu
        iconElementsList={IconElementsShopItemsPage}
        activeIcon={"shop"}
      />
      <MainPageWrapper>ShopPage</MainPageWrapper>
      <BottomBarWithIcons />
    </>
  );
}
export default ShopPage;
