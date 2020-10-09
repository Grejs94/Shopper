import React from "react";

import { Menu } from "components";

import { MainPageWrapper } from "assets/StyledComponents/MainPageWrapper.css";

import { H2, IconsContainer } from "./MainPage.css";

import { IconElementsMainPage } from "assets";

function MainPage() {
  return (
    <>
      <Menu iconElementsList={IconElementsMainPage} activeIcon={""} />
      <MainPageWrapper>
        <H2>Table of Contents:</H2>
        <IconsContainer></IconsContainer>
      </MainPageWrapper>
    </>
  );
}
export default MainPage;
