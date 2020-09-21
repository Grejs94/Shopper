import React from "react";

import {
  SquareContainer,
  Square,
  Content,
  ParentTitle,
  CategoryTitle,
} from "assets/StyledComponents/ItemsDisplayed.css";

import API from "hooks/API";

function ElementsPage() {
  // { isError, isLoading, isSuccess, data }
  const categories = API.useCategory();
  const items = API.useItems();
  const dishesCategories = API.UseDishesCategory();
  const dishes = API.UseDishes();
  const savedList = API.useSavedList();

  if (
    categories.isError ||
    items.isError ||
    dishesCategories.isError ||
    dishes.isError ||
    savedList.isError
  ) {
    return "Fetching data error...";
  } else if (
    categories.isLoading ||
    items.isLoading ||
    dishesCategories.isLoading ||
    dishes.isLoading ||
    savedList.isLoading
  ) {
    return "Loading data...";
  } else if (
    categories.isSuccess &&
    items.isSuccess &&
    dishesCategories.isSuccess &&
    dishes.isSuccess &&
    savedList.isSuccess
  ) {
    const foodCategories = categories.data.filter(
      (category) => category.parentCategoryId === "1"
    );

    const ProductsCategories = categories.data.filter(
      (category) => category.parentCategoryId === "2"
    );

    const CreateSquereItemsList = ({ ItemsList }) => {
      return (
        <SquareContainer>
          {ItemsList.map((item) => (
            <Square key={item.id}>
              <Content>{item.name}</Content>
            </Square>
          ))}
        </SquareContainer>
      );
    };

    const CreateCategoriesList = ({
      parentsTitle,
      filtredCategories,
      itemsList,
    }) => {
      return (
        <div id={parentsTitle}>
          <ParentTitle>{parentsTitle}</ParentTitle>
          {filtredCategories.map((category) => {
            const ItemsList = itemsList.data.filter(
              (item) => item.categoryId === category.id
            );

            if (ItemsList.length === 0) {
              return;
            }

            return (
              <div key={category.name}>
                <CategoryTitle>{category.name}</CategoryTitle>
                <CreateSquereItemsList ItemsList={ItemsList} />
              </div>
            );
          })}
        </div>
      );
    };

    return (
      <div>
        <CreateCategoriesList
          parentsTitle="Food"
          filtredCategories={foodCategories}
          itemsList={items}
        />
        <CreateCategoriesList
          parentsTitle="Products"
          filtredCategories={ProductsCategories}
          itemsList={items}
        />
        <CreateCategoriesList
          parentsTitle="Dishes"
          filtredCategories={dishesCategories.data}
          itemsList={dishes}
        />
        <CreateCategoriesList
          parentsTitle="SavedList"
          filtredCategories={[
            {
              id: "1",
              name: "All",
            },
          ]}
          itemsList={savedList}
        />
      </div>
    );
  }
}

export default ElementsPage;
