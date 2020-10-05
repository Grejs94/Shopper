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

  const workingUseGroceres = [];
  const workingUseProducts = [];
  const workingDishes = [];
  const workingSavedList = [];

  const historyElements = useHistory.data;

  // Groceries
  useGroceres.data.map((grocery) => {
    let value = 0;

    historyElements.map((history) => {
      history.groceries.map((historyGroceryItem) => {
        if (history.groceries.length === 0) {
          return null;
        }

        if (grocery.id === historyGroceryItem.id) {
          value++;
        }
        return null;
      });
      return null;
    });

    const groceryItem = { ...grocery, value: value };

    if (value > 0) {
      workingUseGroceres.push(groceryItem);
    }
    return null;
  });

  const sortedGroceriesFromHistory = workingUseGroceres.sort(
    (a, b) => b.value - a.value
  );

  // Products
  useProducts.data.map((product) => {
    let value = 0;

    historyElements.map((history) => {
      // console.log(history);
      history.products.map((historyProductItem) => {
        // console.log(historyProductItem);
        if (history.products.length === 0) {
          return null;
        }
        if (product.id === historyProductItem.id) {
          value++;
        }
        return null;
      });
      return null;
    });

    const productItem = { ...product, value: value };

    if (value > 0) {
      workingUseProducts.push(productItem);
    }
    return null;
  });

  const sortedProductsFromHistory = workingUseProducts.sort(
    (a, b) => b.value - a.value
  );

  // Dishes
  dishes.data.map((dish) => {
    let value = 0;

    historyElements.map((history) => {
      // console.log(history);
      history.dishes.map((historydishItem) => {
        // console.log(historyProductItem);
        if (history.dishes.length === 0) {
          return null;
        }
        if (dish.id === historydishItem.id) {
          value++;
        }
        return null;
      });
      return null;
    });

    const dishItem = { ...dish, value: value };

    if (value > 0) {
      workingDishes.push(dishItem);
    }
    return null;
  });

  const sortedDishesFromHistory = workingDishes.sort(
    (a, b) => b.value - a.value
  );

  // SavedLists
  savedList.data.map((savedList) => {
    let value = 0;

    historyElements.map((history) => {
      // console.log(history);
      history.savedLists.map((historySavedListsItem) => {
        // console.log(historyProductItem);
        if (history.savedLists.length === 0) {
          return null;
        }
        if (savedList.id === historySavedListsItem.id) {
          value++;
        }
        return null;
      });
      return null;
    });

    const savedListItem = { ...savedList, value: value };

    if (value > 0) {
      workingSavedList.push(savedListItem);
    }
    return null;
  });

  const sortedSavedListFromHistory = workingSavedList.sort(
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
