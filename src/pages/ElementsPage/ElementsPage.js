import React from "react";

import { HideTheMenuWhenScrollIntoView } from "assets/StyledComponents/ItemsDisplayed.css";

import { useSelector } from "react-redux";
import { selectCategory } from "features/category/categorySlice";

import API from "hooks/API";

import { CreateCategoriesList } from "components";

const ScrollToParentCategory = ({ category }) => {
  const div = document.querySelector(`#${category}`);

  if (!!div) {
    // console.log(div);
    div.scrollIntoView();
  }
};

function ElementsPage() {
  // { isError, isLoading, isSuccess, data }
  const categories = API.useCategory();
  const items = API.useItems();
  const dishesCategories = API.UseDishesCategory();
  const dishes = API.UseDishes();
  const savedList = API.useSavedList();
  const useSavedListsCategories = API.useSavedListsCategories();
  const category = useSelector(selectCategory);

  if (
    categories.isError ||
    items.isError ||
    dishesCategories.isError ||
    dishes.isError ||
    savedList.isError ||
    useSavedListsCategories.isError
  ) {
    return "Fetching date error...";
  } else if (
    categories.isLoading ||
    items.isLoading ||
    dishesCategories.isLoading ||
    dishes.isLoading ||
    savedList.isLoading ||
    useSavedListsCategories.isLoading
  ) {
    return "Loading date...";
  } else if (
    categories.isSuccess &&
    items.isSuccess &&
    dishesCategories.isSuccess &&
    dishes.isSuccess &&
    savedList.isSuccess &&
    useSavedListsCategories.isSuccess
  ) {
    const foodCategories = categories.data.filter(
      (category) => category.parentCategoryId === "1"
    );

    const ProductsCategories = categories.data.filter(
      (category) => category.parentCategoryId === "2"
    );

    ScrollToParentCategory({ category });

    return (
      <div>
        <CreateCategoriesList
          parentsTitle="Groceries"
          filtredCategories={foodCategories}
          itemsList={items.data}
        />
        <HideTheMenuWhenScrollIntoView id="Products" />
        <CreateCategoriesList
          parentsTitle="Products"
          filtredCategories={ProductsCategories}
          itemsList={items.data}
        />
        <HideTheMenuWhenScrollIntoView id="Dishes" />
        <CreateCategoriesList
          parentsTitle="Dishes"
          filtredCategories={dishesCategories.data}
          itemsList={dishes.data}
        />
        <HideTheMenuWhenScrollIntoView id="SavedList" />
        <CreateCategoriesList
          parentsTitle="SavedList"
          filtredCategories={useSavedListsCategories.data}
          itemsList={savedList.data}
        />
      </div>
    );
  }
}

export default ElementsPage;
