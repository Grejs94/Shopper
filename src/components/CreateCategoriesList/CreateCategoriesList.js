import React from "react";

import { toast } from "react-toastify";

import {
  SquareContainer,
  Square,
  Content,
  ParentTitle,
  CategoryTitle,
  HideTheMenuWhenScrollIntoView,
} from "assets/StyledComponents/ItemsDisplayed.css";

import API from "hooks/API";

import { incrementedString } from "assets";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const CreateCategoriesList = ({
  parentsTitle,
  filtredCategories,
  itemsList,
  variant = "basket",
}) => {
  const useBasketGroceres = API.useBasketGroceres();
  const useBasketProducts = API.useBasketProducts();
  const useBasketDishes = API.useBasketDishes();
  const useBasketSavedLists = API.useBasketSavedLists();
  const useParentCategories = API.useParentCategories();

  const [mutate_Post_BasketGroceries] = API.useAddBasketGroceries();
  const [mutate_Post_BasketProducts] = API.useAddBasketProducts();
  const [mutate_Post_BasketDishes] = API.useAddBasketDishes();
  const [mutate_Post_BasketSavedLists] = API.useAddBasketSavedLists();

  const [mutate_PUT_BasketGroceries] = API.usePutBasketGroceries();
  const [mutate_PUT_BasketProducts] = API.usePutBasketProducts();
  const [mutate_PUT_BasketDishes] = API.usePutBasketDishes();
  const [mutate_PUT_BasketSavedLists] = API.usePutBasketSavedLists();

  if (
    useBasketGroceres.isError ||
    useBasketProducts.isError ||
    useBasketDishes.isError ||
    useBasketSavedLists.isError ||
    useParentCategories.isError
  ) {
    return "Fetching date error...";
  } else if (
    useBasketGroceres.isLoading ||
    useBasketProducts.isLoading ||
    useBasketDishes.isLoading ||
    useBasketSavedLists.isLoading ||
    useParentCategories.isLoading
  ) {
    return "Loading date...";
  } else if (
    useBasketGroceres.isSuccess &&
    useBasketProducts.isSuccess &&
    useBasketDishes.isSuccess &&
    useBasketSavedLists.isSuccess &&
    useParentCategories.isSuccess
  ) {
    const handleBasketOnClick = (item) => {
      console.log(`klik w element ${item.name} w koszyku`);
    };

    const handleShopOnClick = (item) => {
      const index = Number(item.parentCategoryId) - 1;

      // need be in correct order
      const elementsLists = [
        useBasketGroceres,
        useBasketProducts,
        useBasketDishes,
        useBasketSavedLists,
      ];

      // need be in correct order
      const mutatePostFunctions = [
        mutate_Post_BasketGroceries,
        mutate_Post_BasketProducts,
        mutate_Post_BasketDishes,
        mutate_Post_BasketSavedLists,
      ];

      // need be in correct order
      const mutatePutFunctions = [
        mutate_PUT_BasketGroceries,
        mutate_PUT_BasketProducts,
        mutate_PUT_BasketDishes,
        mutate_PUT_BasketSavedLists,
      ];

      const useBasketElementsList = elementsLists[index];

      const parentCategoryName = useParentCategories.data.find(
        (parentCategory) => parentCategory.id === item.parentCategoryId
      ).name;

      const findElement = useBasketElementsList.data.filter(
        (basketGrocery) => basketGrocery.id === item.id
      );

      const allreadyInBasket = findElement.length ? true : false;

      useParentCategories.data.map((ParentCategory) => {
        if (item.parentCategoryId === ParentCategory.id) {
          if (allreadyInBasket) {
            const basketItem = findElement[0];
            const incrementValue = incrementedString(basketItem.value, "1");

            mutatePutFunctions[index]({
              id: item.id,
              data: {
                ...basketItem,
                value: incrementValue,
              },
            }).then(
              toast.success(
                `The ${parentCategoryName}: "${item.name}" 
                current value is ${incrementValue}`
              )
            );
          } else {
            mutatePostFunctions[index]({
              data: {
                ...item,
                value: "1",
              },
            }).then(
              toast.success(
                `The ${parentCategoryName}: "${item.name}" has been successfully added to your basket`
              )
            );
          }
        } else {
          return null;
        }
        return null;
      });
    };

    return (
      <div>
        {itemsList.length > 0 ? (
          <>
            {parentsTitle !== "Groceries" ? (
              <HideTheMenuWhenScrollIntoView id={parentsTitle} />
            ) : null}
            <ParentTitle>{parentsTitle}</ParentTitle>
          </>
        ) : null}
        {filtredCategories.map((category) => {
          const ItemsList = itemsList.filter(
            (item) => item.categoryId === category.id
          );

          if (ItemsList.length === 0) {
            return null;
          }

          return (
            <div key={category.name}>
              <CategoryTitle>
                {capitalizeFirstLetter(category.name)}
              </CategoryTitle>
              <SquareContainer>
                {ItemsList.map((item) => {
                  return (
                    <Square
                      key={item.id}
                      onClick={() =>
                        variant === "basket"
                          ? handleBasketOnClick(item)
                          : handleShopOnClick(item)
                      }
                    >
                      <Content>
                        {item.value > 1
                          ? `${item.name} (${item.value})`
                          : `${item.name}`}
                      </Content>
                    </Square>
                  );
                })}
              </SquareContainer>
            </div>
          );
        })}
      </div>
    );
  }
};

export default CreateCategoriesList;
