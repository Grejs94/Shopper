import React from "react";

import { ShopTitle } from "./BasketPageContent.css";
import { HideTheMenuWhenScrollIntoView } from "assets/StyledComponents/ItemsDisplayed.css";

import { CreateCategoriesList } from "components";

import API from "hooks/API";

import { useDispatch, useSelector } from "react-redux";

const BasketPageContent = () => {
  // { isError, isLoading, isSuccess, data }
  const useBasket = API.useBasket();
  const useMyshops = API.useMyshops();
  const categories = API.useCategory();
  const items = API.useItems();
  const dishesCategories = API.UseDishesCategory();
  const dishes = API.UseDishes();
  const savedList = API.useSavedList();
  const useSavedListsCategories = API.useSavedListsCategories();

  if (
    useBasket.isError ||
    useMyshops.isError ||
    categories.isError ||
    items.isError ||
    dishesCategories.isError ||
    dishes.isError ||
    savedList.isError ||
    useSavedListsCategories.isError
  ) {
    return "Fetching date error...";
  } else if (
    useBasket.isLoading ||
    useMyshops.isLoading ||
    categories.isLoading ||
    items.isLoading ||
    dishesCategories.isLoading ||
    dishes.isLoading ||
    savedList.isLoading ||
    useSavedListsCategories.isLoading
  ) {
    return "Loading date...";
  } else if (
    useBasket.isSuccess &&
    useMyshops.isSuccess &&
    categories.isSuccess &&
    items.isSuccess &&
    dishesCategories.isSuccess &&
    dishes.isSuccess &&
    savedList.isSuccess &&
    useSavedListsCategories.isSuccess
  ) {
    const createContent = useBasket.data.map((shop) => {
      const basketShopId = shop.shopId;

      const currentShop = useMyshops.data.find(
        (shop) => shop.id === basketShopId
      );

      const ShopItemsDataBaseFormat = shop.items;
      const ShopDishesDataBaseFormat = shop.dishes;
      const ShopSavedListsDataBaseFormat = shop.savedLists;

      const ShopItems = items.data.filter((item) =>
        ShopItemsDataBaseFormat.find(
          (basketItem) => basketItem.itemId === item.id
        )
      );

      const ShopDishes = dishes.data.filter((item) =>
        ShopDishesDataBaseFormat.find(
          (basketItem) => basketItem.dishesId === item.id
        )
      );
      const ShopSavedList = savedList.data.filter((item) =>
        ShopSavedListsDataBaseFormat.find(
          (basketItem) => basketItem.savedListsId === item.id
        )
      );

      // ustaw do reduxa , useEffect ma dbać o to aby to wykonało się tylko raz

      const foodCategories = categories.data.filter(
        (category) => category.parentCategoryId === "1"
      );
      const ProductsCategories = categories.data.filter(
        (category) => category.parentCategoryId === "2"
      );

      return (
        <div key={currentShop.name}>
          <ShopTitle>{currentShop.name}</ShopTitle>
          <CreateCategoriesList
            parentsTitle="Groceries"
            filtredCategories={foodCategories}
            itemsList={ShopItems}
          />
          <HideTheMenuWhenScrollIntoView />
          <CreateCategoriesList
            parentsTitle="Products"
            filtredCategories={ProductsCategories}
            itemsList={ShopItems}
          />
          <HideTheMenuWhenScrollIntoView />
          <CreateCategoriesList
            parentsTitle="Dishes"
            filtredCategories={dishesCategories.data}
            itemsList={ShopDishes}
          />
          <HideTheMenuWhenScrollIntoView />
          <CreateCategoriesList
            parentsTitle="SavedList"
            filtredCategories={useSavedListsCategories.data}
            itemsList={ShopSavedList}
          />
        </div>
      );
    });
    return <div>{createContent}</div>;
  }
};

export default BasketPageContent;
