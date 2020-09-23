import React from "react";

import {
  SquareContainer,
  Square,
  Content,
  ParentTitle,
  CategoryTitle,
  HideTheMenuWhenScrollIntoView,
} from "assets/StyledComponents/ItemsDisplayed.css";

import { useSelector } from "react-redux";
import { selectCategory } from "features/category/categorySlice";

import API from "hooks/API";

const CreateCategoriesList = ({
  parentsTitle,
  filtredCategories,
  itemsList,
}) => {
  if (itemsList.isError) {
    return "Data download error...";
  } else if (itemsList.isLoading) {
    return "Loading data...";
  } else if (itemsList.isSuccess) {
    return (
      <div>
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
              <SquareContainer>
                {ItemsList.map((item) => (
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
  }
};

function ElementsPage() {
  // { isError, isLoading, isSuccess, data }
  const categories = API.useCategory();
  const items = API.useItems();
  const dishesCategories = API.UseDishesCategory();
  const dishes = API.UseDishes();
  const savedList = API.useSavedList();
  const category = useSelector(selectCategory);

  const foodCategories =
    categories.isSuccess &&
    categories.data.filter((category) => category.parentCategoryId === "1");

  const ProductsCategories =
    categories.isSuccess &&
    categories.data.filter((category) => category.parentCategoryId === "2");

  const ScrollToParentCategory = (() => {
    const div = document.querySelector(`#${category}`);

    if (!!div) {
      console.log(div);
      div.scrollIntoView();
    }
  })();

  return (
    <div>
      <CreateCategoriesList
        parentsTitle="Groceries"
        filtredCategories={foodCategories}
        itemsList={items}
      />
      <HideTheMenuWhenScrollIntoView id="Products" />
      <CreateCategoriesList
        parentsTitle="Products"
        filtredCategories={ProductsCategories}
        itemsList={items}
      />
      <HideTheMenuWhenScrollIntoView id="Dishes" />
      <CreateCategoriesList
        parentsTitle="Dishes"
        filtredCategories={dishesCategories.data}
        itemsList={dishes}
      />
      <HideTheMenuWhenScrollIntoView id="SavedList" />
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

export default ElementsPage;
