import React from "react";

import { ItemsContainer, Item, EmptyItem, ItemText } from "./Children.css";

import API from "hooks/API";

import { Link } from "react-router-dom";

function DishesChildren({ to }) {
  const { isError, isLoading, isSuccess, data } = API.HookDishesCategory();

  return (
    <>
      {isError
        ? "fetching data error..."
        : isLoading
        ? "Loading..."
        : isSuccess
        ? data.map((category) => (
            <ItemsContainer key={category.name}>
              <Link style={{ textDecoration: "none", color: "white" }} to={to}>
                <Item>
                  <ItemText>- {category.name}</ItemText>
                </Item>
              </Link>
              <EmptyItem />
            </ItemsContainer>
          ))
        : null}
    </>
  );
}

export default DishesChildren;
