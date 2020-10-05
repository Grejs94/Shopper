import React from "react";

import API from "hooks/API";

import { EditModeList } from "components";

import { Message } from "./CreateSmartList.css";

const CreateSmartList = () => {
  const useGroceres = API.useGroceres();
  const useGroceriesCategories = API.useGroceriesCategories();
  const useProducts = API.useProducts();
  const useProductsCategories = API.useProductsCategories();
  const dishes = API.UseDishes();
  const dishesCategories = API.UseDishesCategory();
  const savedList = API.useSavedList();
  const useSavedListsCategories = API.useSavedListsCategories();

  const useHistory = API.useHistory();

  if (
    useGroceres.isError ||
    useGroceriesCategories.isError ||
    useProducts.isError ||
    useProductsCategories.isError ||
    dishes.isError ||
    dishesCategories.isError ||
    savedList.isError ||
    useSavedListsCategories.isError ||
    useHistory.isError
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
    useSavedListsCategories.isLoading.isLoading ||
    useHistory.isLoading
  ) {
    return "Loading date...";
  }

  if (useHistory.data.length === 0) {
    return (
      <div>
        <Message>
          Your history is empty. I need data to create smartlist!
        </Message>
      </div>
    );
  }
  // 218 code lines

  const workingUseGroceresX = [];
  const workingUseProductsX = [];
  const workingDishesX = [];
  const workingSavedListX = [];

  const workingArraysList = [
    workingUseGroceresX,
    workingUseProductsX,
    workingDishesX,
    workingSavedListX,
  ];

  const ArrayParentCategories = [useGroceres, useProducts, dishes, savedList];

  const historyElements = useHistory.data;

  ArrayParentCategories.map((array, index) => {
    array.data.map((item) => {
      let value = 0;

      historyElements.map((history) => {
        const switchParentCategory = (index) => {
          switch (index) {
            case 0:
              return history.groceries;
            case 1:
              return history.products;
            case 2:
              return history.dishes;
            case 3:
              return history.savedLists;

            default:
              return history.groceries;
          }
        };

        switchParentCategory(index).map((historyItem) => {
          if (switchParentCategory(index).length === 0) {
            return null;
          }
          if (item.id === historyItem.id) {
            value++;
          }
          return null;
        });

        const parentCategoryItem = { ...item, value: value };

        if (value > 0) {
          workingArraysList[index].push(parentCategoryItem);
        }
        return null;
      });
      return null;
    });
    return null;
  });

  const sortedGroceriesFromHistory = workingArraysList[0].sort(
    (a, b) => b.value - a.value
  );
  const sortedProductsFromHistory = workingArraysList[1].sort(
    (a, b) => b.value - a.value
  );
  const sortedDishesFromHistory = workingArraysList[2].sort(
    (a, b) => b.value - a.value
  );
  const sortedSavedListFromHistory = workingArraysList[3].sort(
    (a, b) => b.value - a.value
  );

  return (
    <div>
      <EditModeList
        parentsTitle="Groceries"
        itemsList={sortedGroceriesFromHistory}
        filtredCategories={useGroceriesCategories.data}
        variant="shop"
      />
      <EditModeList
        parentsTitle="Products"
        itemsList={sortedProductsFromHistory}
        filtredCategories={useProductsCategories.data}
        variant="shop"
      />
      <EditModeList
        parentsTitle="Dishes"
        itemsList={sortedDishesFromHistory}
        filtredCategories={dishesCategories.data}
        variant="shop"
      />
      <EditModeList
        parentsTitle="SavedList"
        itemsList={sortedSavedListFromHistory}
        filtredCategories={useSavedListsCategories.data}
        variant="shop"
      />
    </div>
  );
};

export default CreateSmartList;
