import React from "react";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { setCategory } from "features/category/categorySlice";

import {
  ItemsContainer,
  Item,
  EmptyItem,
  ItemPictureContainer,
  ItemPicture,
  ItemText,
} from "assets/StyledComponents/IconsItem.css";

function IconsItem({ image, text, to }) {
  const dispatch = useDispatch();

  return (
    <>
      <ItemsContainer
        onClick={() => {
          dispatch(setCategory(text));
        }}
      >
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
    </>
  );
}

export default IconsItem;
