import React from "react";

import {
  ItemsContainer,
  Item,
  EmptyItem,
  ItemPictureContainer,
  ItemPicture,
  ItemText,
} from "./IconsItem.css";

import { Link } from "react-router-dom";

function IconsItem({ image, text, to }) {
  return (
    <ItemsContainer>
      <Link to={to} style={{ textDecoration: "none", color: "white" }}>
        <Item>
          <ItemPictureContainer>
            <ItemPicture src={image} />
          </ItemPictureContainer>
          <ItemText>{text}</ItemText>
        </Item>
      </Link>
      <EmptyItem />
    </ItemsContainer>
  );
}

export default IconsItem;
