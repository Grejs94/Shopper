import React from "react";

import { HideTheMenuWhenScrollIntoView } from "assets/StyledComponents/ItemsDisplayed.css";
import { ShopTitle } from "./BasketPageContent.css";

import { CreateCategoriesList } from "components";

import API from "hooks/API";

const BasketPageContent = () => {
  // { isError, isLoading, isSuccess, data }
  const useBasket = API.useBasket();
  const useMyshops = API.useMyshops();
  const categories = API.useCategory();
  const items = API.useItems();
  const dishesCategories = API.UseDishesCategory();
  const dishes = API.UseDishes();
  const savedList = API.useSavedList();

  if (
    useBasket.isError ||
    useMyshops.isError ||
    categories.isError ||
    items.isError ||
    dishesCategories.isError ||
    dishes.isError ||
    savedList.isError
  ) {
    return "Fetching date error...";
  } else if (
    useBasket.isLoading ||
    useMyshops.isLoading ||
    categories.isLoading ||
    items.isLoading ||
    dishesCategories.isLoading ||
    dishes.isLoading ||
    savedList.isLoading
  ) {
    return "Loading date...";
  } else if (
    useBasket.isSuccess &&
    useMyshops.isSuccess &&
    categories.isSuccess &&
    items.isSuccess &&
    dishesCategories.isSuccess &&
    dishes.isSuccess &&
    savedList.isSuccess
  ) {
    const createL = useBasket.data.map((shop) => {
      //   const ShopName = shop.ShopName;

      //   getShopName
      console.log(useMyshops.data.citys);
      //   const ShopName = useMyshops.data.map(
      //     (item) => console.log(item)
      //     // ShopDishesDataBaseFormat.find(
      //     //   (basketItem) => basketItem.dishesId === item.id
      //     // )
      //   );
      //   console.log(ShopName);

      //   console.log(useBasket);
      // const ShopItemsDataBaseFormat = shop.items;
      // console.log(ShopItemsDataBaseFormat);

      // const ShopDishesDataBaseFormat = shop.dishes;
      // console.log(ShopDishesDataBaseFormat);

      const ShopSavedListsDataBaseFormat = shop.savedLists;
      // console.log(ShopSavedListsDataBaseFormat);

      // console.log(ShopItemsDataBaseFormat);
      // console.log(items.data);

      // const ShopItems = items.data.filter((item) =>
      //   ShopItemsDataBaseFormat.find(
      //     (basketItem) => basketItem.itemId === item.id
      //   )
      // );
      // console.log(ShopItems);

      // const ShopDishes = dishes.data.filter((item) =>
      //   ShopDishesDataBaseFormat.find(
      //     (basketItem) => basketItem.dishesId === item.id
      //   )
      // );
      // console.log(ShopDishes);

      const ShopSavedList = savedList.data.filter((item) =>
        ShopSavedListsDataBaseFormat.find(
          (basketItem) => basketItem.savedListsId === item.id
        )
      );
      //   console.log(ShopSavedList);

      return (
        <div>
          <ShopTitle></ShopTitle>
        </div>
      );
    });

    // basketItems
    // basketDishes
    // basketSavedLists

    const foodCategories = categories.data.filter(
      (category) => category.parentCategoryId === "1"
    );

    const ProductsCategories = categories.data.filter(
      (category) => category.parentCategoryId === "2"
    );

    return (
      <div>
        {createL}
        {/* <CreateCategoriesList
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
          filtredCategories={[
            {
              id: "1",
              name: "All",
            },
          ]}
          itemsList={savedList.data}
        /> */}
      </div>
    );
  }
};

export default BasketPageContent;
