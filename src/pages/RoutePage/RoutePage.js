import React from "react";

import { Menu, BottomBarWithIcons } from "components";

import { MainPageWrapper } from "assets/StyledComponents/MainPageWrapper.css";

import { Message } from "./RoutePage.css";

import { IconElementsRoutePage } from "assets";

function RoutePage() {
  return (
    <>
      <Menu iconElementsList={IconElementsRoutePage} activeIcon={"route"} />
      <MainPageWrapper>
        <Message>Page tab still in production!</Message>
      </MainPageWrapper>
      <BottomBarWithIcons />
    </>
  );
}
export default RoutePage;
