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

function IconsItem({ image, text, handle, to }) {
  const ItemOnly = (
    <ItemsContainer>
      <Item onClick={() => handle()}>
        <ItemPictureContainer>
          <ItemPicture src={image} />
        </ItemPictureContainer>
        <ItemText>{text}</ItemText>
      </Item>
      <EmptyItem />
    </ItemsContainer>
  );

  const ItemWithLink = (
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
  return handle ? ItemOnly : ItemWithLink;
}

export default IconsItem;
