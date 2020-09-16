import React from "react";

import { Menu } from "components";

import { MainPageWrapper } from "assets/StyledComponents/MainPageWrapper.css";

import { IconElementsMainPage } from "assets";

function MainPage() {
  return (
    <>
      <Menu iconElementsList={IconElementsMainPage} activeIcon={""} />
      <MainPageWrapper>MainPage</MainPageWrapper>
    </>
  );
}
export default MainPage;
