import React from "react";

import { useSelector } from "react-redux";
import { selectEditIcon } from "features/toggleBottomBarIconsSlice/toggleBottomBarIconsSlice";

import {
  Menu,
  BottomBarWithIcons,
  PageInfo,
  BasketPageContent,
} from "components";

import { MainPageWrapper } from "assets/StyledComponents/MainPageWrapper.css";

import {
  IconElementsBasketPage,
  IconsBottomEditVariant,
  IconsBottomListVariant,
} from "assets";

function BasketPage() {
  const editMode = useSelector(selectEditIcon);

  return (
    <>
      <Menu iconElementsList={IconElementsBasketPage} activeIcon="basket" />
      <PageInfo description={"Basket"} />
      <MainPageWrapper>
        <BasketPageContent />
      </MainPageWrapper>
      <BottomBarWithIcons
        icons={editMode ? IconsBottomEditVariant : IconsBottomListVariant}
      />
    </>
  );
}
export default BasketPage;
