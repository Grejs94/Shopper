import React from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActiveMenuIcon } from "features/activeMenuIcon/activeMenuIconSlice";

import {
  basket_blackImg,
  basket_coloredImg,
  route_blackImg,
  route_coloredImg,
  shopHelper_blackImg,
  shopHelper_coloredImg,
  settings_blackImg,
  settings_coloredImg,
  shopItems_coloredImg,
  shopItems_blackImg,
} from "pictures";

import {
  Wrapper,
  IconsContainer,
  IconElement,
  LogoContainer,
  Img,
  LogoElement,
} from "./Menu.css";

import { resetEditIcon } from "features/toggleBottomBarIconsSlice/toggleBottomBarIconsSlice";

function Menu({ iconElementsList, activeIcon }) {
  const dispatch = useDispatch();

  const IconSwitch = (icon) => {
    switch (icon) {
      case "route":
        if (activeIcon === "route") {
          return route_coloredImg;
        } else {
          return route_blackImg;
        }

      case "settings":
        if (activeIcon === "settings") {
          return settings_coloredImg;
        } else {
          return settings_blackImg;
        }

      case "shop":
        if (activeIcon === "shop") {
          return shopItems_coloredImg;
        } else {
          return shopItems_blackImg;
        }

      case "shopHelper":
        if (activeIcon === "shopHelper") {
          return shopHelper_coloredImg;
        } else {
          return shopHelper_blackImg;
        }

      case "basket":
        if (activeIcon === "basket") {
          return basket_coloredImg;
        } else {
          return basket_blackImg;
        }

      default:
        return;
    }
  };

  const iconList = iconElementsList.map((icon) => {
    return (
      <IconElement
        onClick={() => {
          dispatch(setActiveMenuIcon(icon));
        }}
        key={icon}
      >
        <Link to={`/${icon}`}>
          <Img src={IconSwitch(icon)} />
        </Link>
      </IconElement>
    );
  });

  const createLogoLink = (
    <LogoElement>
      <Link
        to="/"
        style={{ textDecoration: "none", color: "black" }}
        onClick={() => dispatch(resetEditIcon())}
      >
        Shopper
      </Link>
    </LogoElement>
  );

  return (
    <Wrapper>
      <LogoContainer>{createLogoLink}</LogoContainer>
      <IconsContainer>{iconList}</IconsContainer>
    </Wrapper>
  );
}
export default Menu;
