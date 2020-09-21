import React from "react";

import { ItemsContainer, Item, EmptyItem, ItemText } from "./Children.css";

import API from "hooks/API";

import { Link } from "react-router-dom";

function GroceriesChildren({ to }) {
  const { isError, isLoading, isSuccess, data } = API.useCategory();

  const CategoriesFiltred =
    isSuccess && data.filter((category) => category.parentCategoryId === "1");

  return (
    <>
      {isError
        ? "fetching data error..."
        : isLoading
        ? "Loading..."
        : isSuccess
        ? CategoriesFiltred.map((category) => (
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

export default GroceriesChildren;
