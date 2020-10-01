import React from "react";

import { useSelector } from "react-redux";

import { EditModeList, ListModeList } from "components";

import { selectEditIcon } from "features/toggleBottomBarIconsSlice/toggleBottomBarIconsSlice";

import API from "hooks/API";

const BasketPageContent = () => {
  // { isError, isLoading, isSuccess, data }
  const editMode = useSelector(selectEditIcon);

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
    return editMode ? (
      <div>
        <EditModeList
          parentsTitle="Groceries"
          itemsList={useBasketGroceres.data}
          filtredCategories={useGroceriesCategories.data}
        />
        <EditModeList
          parentsTitle="Products"
          itemsList={useBasketProducts.data}
          filtredCategories={useProductsCategories.data}
        />
        <EditModeList
          parentsTitle="Dishes"
          itemsList={useBasketDishes.data}
          filtredCategories={dishesCategories.data}
        />
        <EditModeList
          parentsTitle="SavedList"
          itemsList={useBasketSavedLists.data}
          filtredCategories={useSavedListsCategories.data}
        />
      </div>
    ) : (
      <div>
        <ListModeList
          parentsTitle="Groceries"
          itemsList={useBasketGroceres.data}
          filtredCategories={useGroceriesCategories.data}
        />
        <ListModeList
          parentsTitle="Products"
          itemsList={useBasketProducts.data}
          filtredCategories={useProductsCategories.data}
        />
        <ListModeList
          parentsTitle="Dishes"
          itemsList={useBasketDishes.data}
          filtredCategories={dishesCategories.data}
        />
        <ListModeList
          parentsTitle="SavedList"
          itemsList={useBasketSavedLists.data}
          filtredCategories={useSavedListsCategories.data}
        />
      </div>
    );
  }
};

export default BasketPageContent;
