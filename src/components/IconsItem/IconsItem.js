import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { setCategory } from "features/category/categorySlice";

import {
  ItemsContainer,
  Item,
  EmptyItem,
  ItemPictureContainer,
  ItemPicture,
  ItemText,
} from "assets/StyledComponents/IconsItem.css";

function IconsItem({ image, text }) {
  const dispatch = useDispatch();

  return (
    <>
      <ItemsContainer>
        <Item onClick={() => dispatch(setCategory(text))}>
          <ItemPictureContainer>
            <ItemPicture src={image} />
          </ItemPictureContainer>
          <ItemText>{text}</ItemText>
        </Item>
        <EmptyItem />
      </ItemsContainer>
    </>
  );
}

export default IconsItem;
