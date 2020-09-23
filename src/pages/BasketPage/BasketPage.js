import React from "react";

import {
  Menu,
  BottomBarWithIcons,
  PageInfo,
  BasketPageContent,
} from "components";

import { MainPageWrapper } from "assets/StyledComponents/MainPageWrapper.css";

import { IconElementsBasketPage, IconsBottom1 } from "assets";

function BasketPage() {
  return (
    <>
      <Menu iconElementsList={IconElementsBasketPage} activeIcon="basket" />
      <PageInfo description={"Basket"} />
      <MainPageWrapper>
        <BasketPageContent />
      </MainPageWrapper>
      <BottomBarWithIcons icons={IconsBottom1} />
    </>
  );
}
export default BasketPage;
