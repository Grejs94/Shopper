import React from "react";

import { useQuery } from "react-query";

import { ListOfSquares } from "components";

import {
  Wrapper,
  SquareContainer,
  Square,
  Span,
  Content,
  ParentTitle,
  CategoryTitle,
} from "assets/StyledComponents/ItemsDisplayed.css";

import API from "hooks/API";

function ElementsPage() {
  // { isError, isLoading, isSuccess, data }
  const categories = API.useCategory();
  const items = API.useItems();
  const ParentCategories = API.useParentCategory();

  if (categories.isError || items.isError || ParentCategories.isError) {
    return "Fetching data error...";
  } else if (
    categories.isLoading ||
    items.isLoading ||
    ParentCategories.isLoading
  ) {
    return "Loading data...";
  } else if (
    categories.isSuccess &&
    items.isSuccess &&
    ParentCategories.isSuccess
  ) {
    const filtredParentCategories = ParentCategories.data.filter(
      (parentcategory) => parentcategory.id !== "4"
    );

    // console.log(filtredParentCategories);
    // console.log(ParentCategories.data);
    // console.log(items.data);
    // console.log(category.data);

    const foodCategories = categories.data.filter(
      (category) => category.parentCategoryId === "1"
    );

    const ProductsCategories = categories.data.filter(
      (category) => category.parentCategoryId === "2"
    );

    // console.log(foodCategories);
    // console.log(ProductsCategories);

    const CreateCategoriesList = ({ ParentsTitle, FiltredCategories }) => {
      return (
        <div id={ParentsTitle}>
          <ParentTitle>{ParentsTitle}</ParentTitle>
          {FiltredCategories.map((category) => {
            const categoryItems = items.data.filter(
              (item) => item.categoryId === category.id
            );

            return (
              <div key={category.name}>
                <CategoryTitle>{category.name}</CategoryTitle>
                <SquareContainer>
                  {categoryItems.map((item) => (
                    <Square key={item.id}>
                      <Content>{item.name}</Content>
                    </Square>
                  ))}
                </SquareContainer>
              </div>
            );
          })}
        </div>
      );
    };

    const DishesList = "";

    return (
      <div>
        <CreateCategoriesList
          ParentsTitle="Food"
          FiltredCategories={foodCategories}
        />
        <CreateCategoriesList
          ParentsTitle="Products"
          FiltredCategories={ProductsCategories}
        />
      </div>
    );
  }
}

export default ElementsPage;
