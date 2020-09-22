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
            <CreateSquereItemsList ItemsList={ItemsList} />
          </div>
        );
      })}
    </div>
  );
};

function ElementsPage() {
  // { isError, isLoading, isSuccess, data }
  const categories = API.useCategory();
  const items = API.useItems();
  const dishesCategories = API.UseDishesCategory();
  const dishes = API.UseDishes();
  const savedList = API.useSavedList();
  const category = useSelector(selectCategory);

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

    const div = document.querySelector(`#${category}`);

    setTimeout(() => {
      if (!!div) {
        console.log(div);
        div.scrollIntoView();
      }
    }, 300);

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
}

export default ElementsPage;
