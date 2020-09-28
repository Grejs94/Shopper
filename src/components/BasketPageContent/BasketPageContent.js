import React from "react";

import { HideTheMenuWhenScrollIntoView } from "assets/StyledComponents/ItemsDisplayed.css";

import { CreateCategoriesList } from "components";

import API from "hooks/API";

const BasketPageContent = () => {
  // { isError, isLoading, isSuccess, data }
  const useGroceres = API.useGroceres();
  const useGroceriesCategories = API.useGroceriesCategories();
  const useProducts = API.useProducts();
  const useProductsCategories = API.useProductsCategories();
  const dishes = API.UseDishes();
  const dishesCategories = API.UseDishesCategory();
  const savedList = API.useSavedList();
  const useSavedListsCategories = API.useSavedListsCategories();

  const useBasketGroceres = API.useBasketGroceres();
  const useBasketProducts = API.useBasketProducts();
  const useBasketDishes = API.useBasketDishes();
  const useBasketSavedLists = API.useBasketSavedLists();

  if (
    useGroceres.isError ||
    useGroceriesCategories.isError ||
    useProducts.isError ||
    useProductsCategories.isError ||
    dishes.isError ||
    dishesCategories.isError ||
    savedList.isError ||
    useSavedListsCategories.isError ||
    useBasketGroceres.isError ||
    useBasketProducts.isError ||
    useBasketDishes.isError ||
    useBasketSavedLists.isError
  ) {
    return "Fetching date error...";
  } else if (
    useGroceres.isLoading ||
    useGroceriesCategories.isLoading ||
    useProducts.isLoading ||
    useProductsCategories.isLoading ||
    dishes.isLoading ||
    dishesCategories.isLoading ||
    savedList.isLoading ||
    useSavedListsCategories.isLoading ||
    useBasketGroceres.isLoading ||
    useBasketProducts.isLoading ||
    useBasketDishes.isLoading ||
    useBasketSavedLists.isLoading
  ) {
    return "Loading date...";
  } else if (
    useGroceres.isSuccess &&
    useGroceriesCategories.isSuccess &&
    useProducts.isSuccess &&
    useProductsCategories.isSuccess &&
    dishes.isSuccess &&
    dishesCategories.isSuccess &&
    savedList.isSuccess &&
    useSavedListsCategories.isSuccess &&
    useBasketGroceres.isSuccess &&
    useBasketProducts.isSuccess &&
    useBasketDishes.isSuccess &&
    useBasketSavedLists.isSuccess
  ) {
    return (
      <div>
        <CreateCategoriesList
          parentsTitle="Groceries"
          itemsList={useBasketGroceres.data}
          filtredCategories={useGroceriesCategories.data}
        />
        <HideTheMenuWhenScrollIntoView />
        <CreateCategoriesList
          parentsTitle="Products"
          itemsList={useBasketProducts.data}
          filtredCategories={useProductsCategories.data}
        />
        <HideTheMenuWhenScrollIntoView />
        <CreateCategoriesList
          parentsTitle="Dishes"
          itemsList={useBasketDishes.data}
          filtredCategories={dishesCategories.data}
        />
        <HideTheMenuWhenScrollIntoView />
        <CreateCategoriesList
          parentsTitle="SavedList"
          itemsList={useBasketSavedLists.data}
          filtredCategories={useSavedListsCategories.data}
        />
      </div>
    );
  }
};

export default BasketPageContent;
