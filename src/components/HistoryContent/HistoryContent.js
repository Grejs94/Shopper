import React from "react";

import { HistoryParentCategoryList } from "./components";

import { Wrapper, Date, EmptyDivToSpace } from "./HistoryContent.css";

import API from "hooks/API";

const HistoryContent = () => {
  const useHistory = API.useHistory();

  const useGroceriesCategories = API.useGroceriesCategories();
  const useProductsCategories = API.useProductsCategories();
  const dishesCategories = API.UseDishesCategory();
  const useSavedListsCategories = API.useSavedListsCategories();

  if (
    useHistory.isError ||
    useGroceriesCategories.isError ||
    useProductsCategories.isError ||
    dishesCategories.isError ||
    useSavedListsCategories.isError
  ) {
    return "Fetching date error...";
  } else if (
    useHistory.isLoading ||
    useGroceriesCategories.isLoading ||
    useProductsCategories.isLoading ||
    dishesCategories.isLoading ||
    useSavedListsCategories.isLoading
  ) {
    return "Loading date...";
  } else if (
    useHistory.isSuccess &&
    useGroceriesCategories.isSuccess &&
    useProductsCategories.isSuccess &&
    dishesCategories.isSuccess &&
    useSavedListsCategories.isSuccess
  ) {
    const historyMap = useHistory.data.map(
      ({ groceries, products, dishes, savedLists, id, DateToShow }) => {
        return (
          <Wrapper key={id}>
            <Date>{DateToShow}</Date>
            <HistoryParentCategoryList
              parentsTitle="Groceries"
              itemsList={groceries}
              filtredCategories={useGroceriesCategories.data}
            />
            <EmptyDivToSpace />
            <HistoryParentCategoryList
              parentsTitle="Products"
              itemsList={products}
              filtredCategories={useProductsCategories.data}
            />
            <EmptyDivToSpace />
            <HistoryParentCategoryList
              parentsTitle="Dishes"
              itemsList={dishes}
              filtredCategories={dishesCategories.data}
            />
            <EmptyDivToSpace />
            <HistoryParentCategoryList
              parentsTitle="SavedList"
              itemsList={savedLists}
              filtredCategories={useSavedListsCategories.data}
            />
          </Wrapper>
        );
      }
    );

    return historyMap;
  }
};

export default HistoryContent;
