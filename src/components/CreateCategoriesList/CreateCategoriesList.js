import React from "react";

import {
  SquareContainer,
  Square,
  Content,
  ParentTitle,
  CategoryTitle,
  HideTheMenuWhenScrollIntoView,
} from "assets/StyledComponents/ItemsDisplayed.css";

import API from "hooks/API";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const handleBasketOnClick = () => {
  console.log("klik w element w koszyku");
};

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

  // const [mutate_Post_BasketGroceries] = API.useAddBasketGroceries();
  // const [mutate_Post_BasketProducts] = API.useAddBasketProducts();
  // const [mutate_Post_BasketDishes] = API.useAddBasketDishes();
  // const [mutate_Post_BasketSavedLists] = API.useAddBasketGroceries();

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
    const handleShopOnClick = (item) => {
      // need be in correct order
      const elementsLists = [
        useBasketGroceres,
        useBasketProducts,
        useBasketDishes,
        useBasketSavedLists,
      ];

      // need be in correct order
      useParentCategories.data.map((ParentCategory) => {
        if (item.parentCategoryId === ParentCategory.id) {
          const index = Number(item.parentCategoryId) - 1;
          const useBasketElementsList = elementsLists[index];

          const findElement = useBasketElementsList.data.filter(
            (basketGrocery) => basketGrocery.id === item.id
          );

          const allreadyInBasket = findElement.length ? true : false;

          if (allreadyInBasket) {
            console.log("produkt jest w koszyku zwiększ wartość");
          } else {
            console.log("produktu nie ma jeszcze w koszyku dodaj go");
          }
        } else {
          return null;
        }
        return null;
      });
    };

    const CreateContent = (handleOnClick) => {
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
                      <Square key={item.id} onClick={() => handleOnClick(item)}>
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
    };

    return variant === "basket" ? (
      <>{CreateContent(handleBasketOnClick)}</>
    ) : (
      <>{CreateContent(handleShopOnClick)}</>
    );
  }
};

export default CreateCategoriesList;
