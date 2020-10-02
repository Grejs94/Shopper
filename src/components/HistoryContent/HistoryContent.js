import React from "react";

import { HistoryParentCategoryList } from "./components";

import { Wrapper, Date, EmptyDivToSpace, Button } from "./HistoryContent.css";

import API from "hooks/API";

const HistoryContent = () => {
  const useHistory = API.useHistory();

  const useGroceriesCategories = API.useGroceriesCategories();
  const useProductsCategories = API.useProductsCategories();
  const dishesCategories = API.UseDishesCategory();
  const useSavedListsCategories = API.useSavedListsCategories();

  const [mutate_DELETE_DeleteHistory] = API.useDeleteHistory();

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
    const CreateHistoryElement = useHistory.data.map(
      ({ groceries, products, dishes, savedLists, id, DateToShow }) => {
        return (
          <Wrapper key={id}>
            <div>
              <Date>{DateToShow}</Date>
              <Button
                onClick={() =>
                  mutate_DELETE_DeleteHistory({
                    id: id,
                  })
                }
              >
                Delete from history
              </Button>
            </div>

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

    return CreateHistoryElement;
  }
};

export default HistoryContent;
