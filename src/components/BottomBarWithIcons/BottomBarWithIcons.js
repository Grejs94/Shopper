import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";

import {
  Wrapper,
  ContainerReturnIcon,
  ContainerRestIcons,
  IconElement,
  Img,
} from "./BottomBarWithIcons.css";

import {
  edit_blackImg,
  edit_coloredImg,
  return_blackImg,
  return_coloredImg,
} from "pictures";

import {
  selectEditIcon,
  resetEditIcon,
} from "features/toggleBottomBarIconsSlice/toggleBottomBarIconsSlice";

function BottomBarWithIcons({ icons }) {
  const dispatch = useDispatch();
  const editIcon = useSelector(selectEditIcon);

  const history = useHistory();

  const handleMouseDownIcon = () => {
    const img = document.querySelector("#returnIcon");
    img.setAttribute("src", return_coloredImg);
  };

  const handleMouseUpIcon = () => {
    const img = document.querySelector("#returnIcon");
    img.setAttribute("src", return_blackImg);
  };

  const resetIcon = (
    <IconElement>
      <Img
        id="returnIcon"
        src={return_blackImg}
        onMouseDown={() => handleMouseDownIcon()}
        onMouseUp={() => handleMouseUpIcon()}
        onClick={() => {
          history.goBack();
          dispatch(resetEditIcon());
        }}
      ></Img>
    </IconElement>
  );

  const IconSwitch = (icon) => {
    switch (icon) {
      case "edit":
        if (editIcon === true) {
          return edit_coloredImg;
        } else {
          return edit_blackImg;
        }

      default:
        return;
    }
  };

  const restIconsList =
    icons &&
    icons.map(({ name, onClick }) => (
      <IconElement
        key={name}
        onClick={() => {
          dispatch(onClick());
        }}
      >
        <Img src={IconSwitch(name)}></Img>
      </IconElement>
    ));

  return (
    <Wrapper>
      <ContainerReturnIcon>{resetIcon}</ContainerReturnIcon>
      <ContainerRestIcons>{restIconsList}</ContainerRestIcons>
    </Wrapper>
  );
}
export default BottomBarWithIcons;
