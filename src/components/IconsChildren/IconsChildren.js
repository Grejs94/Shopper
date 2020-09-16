import React from "react";

import { ItemsContainer, Item, EmptyItem, ItemText } from "./IconsChildren.css";

function IconsChildren({ text }) {
  return (
    <ItemsContainer>
      <Item>
        <ItemText>{text}</ItemText>
      </Item>
      <EmptyItem />
    </ItemsContainer>
  );
}

export default IconsChildren;
