import React from "react";

import {
  Item,
  ItemPictureContainer,
  ItemPicture,
  ItemText,
} from "./IconItem.css";

function IconItem({ image, text, addStyle, handleOnClick = () => {} }) {
  return (
    <Item onClick={handleOnClick} style={addStyle}>
      <ItemPictureContainer>
        <ItemPicture src={image} />
      </ItemPictureContainer>
      <ItemText>{text}</ItemText>
    </Item>
  );
}

export default IconItem;
