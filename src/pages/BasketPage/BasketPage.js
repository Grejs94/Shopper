import React from "react";

import { useSelector } from "react-redux";
import { selectEditIcon } from "features/toggleBottomBarIconsSlice/toggleBottomBarIconsSlice";

import { Switch, Route } from "react-router-dom";

import {
  Menu,
  BottomBarWithIcons,
  PageInfo,
  BasketPageContent,
  Modal,
} from "components";

import { MainPageWrapper } from "assets/StyledComponents/MainPageWrapper.css";

import {
  IconElementsBasketPage,
  IconsBottomEditVariant,
  IconsBottomListVariant,
  saveIconArray,
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
      <Switch>
        <Route path="/basket/messageWhenEmpty">
          <Modal message="You cannot send purchase history if the shopping cart is empty"></Modal>
        </Route>
      </Switch>
      <BottomBarWithIcons
        icons={editMode ? IconsBottomEditVariant : IconsBottomListVariant}
        saveIconArray={saveIconArray}
      />
    </>
  );
}
export default BasketPage;
