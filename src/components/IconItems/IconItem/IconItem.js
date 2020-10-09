import React from "react";

import {
  Item,
  ItemPictureContainer,
  ItemPicture,
  ItemText,
} from "./IconItem.css";

function IconItem({ image, text }) {
  return (
    <Item>
      <ItemPictureContainer>
        <ItemPicture src={image} />
      </ItemPictureContainer>
      <ItemText>{text}</ItemText>
    </Item>
  );
}

export default IconItem;
