import React from "react";

import {
  SquareContainer,
  Square,
  Content,
  ParentTitle,
  CategoryTitle,
  HideTheMenuWhenScrollIntoView,
} from "assets/StyledComponents/ItemsDisplayed.css";

import { queryCache, useMutation } from "react-query";

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

  const [mutateBasketGroceries] = useMutation(API.addBasketGroceries, {
    onSuccess() {
      queryCache.invalidateQueries("basketGroceres");
    },
  });

  const [mutateBasketProducts] = useMutation(API.addBasketProducts, {
    onSuccess() {
      queryCache.invalidateQueries("basketProducts");
    },
  });

  const [mutateBasketDishes] = useMutation(API.addBasketDishes, {
    onSuccess() {
      queryCache.invalidateQueries("basketDishes");
    },
  });

  const [mutateBasketSavedLists] = useMutation(API.addBasketSavedLists, {
    onSuccess() {
      queryCache.invalidateQueries("basketSavedLists");
    },
  });

  if (
    useBasketGroceres.isError ||
    useBasketProducts.isError ||
    useBasketDishes.isError ||
    useBasketSavedLists.isError
  ) {
    return "Fetching date error...";
  } else if (
    useBasketGroceres.isLoading ||
    useBasketProducts.isLoading ||
    useBasketDishes.isLoading ||
    useBasketSavedLists.isLoading
  ) {
    return "Loading date...";
  } else if (
    useBasketGroceres.isSuccess &&
    useBasketProducts.isSuccess &&
    useBasketDishes.isSuccess &&
    useBasketSavedLists.isSuccess
  ) {
    const handleShopOnClick = (item) => {
      if (item.parentCategoryId === "1") {
        const findNumberinBasket = useBasketGroceres.data.filter(
          (basketGrocery) => basketGrocery.id === item.id
        );

        const allreadyInBasket = findNumberinBasket.length ? true : false;

        if (allreadyInBasket) {
          console.log("produkt jest w koszyku zwiększ wartość");
        } else {
          mutateBasketGroceries({
            data: {
              id: item.id,
              name: item.name,
              categoryId: item.categoryId,
              parentCategoryId: item.parentCategoryId,
              value: "1",
            },
          }).then(() => {
            console.log("dodane");
          });
          console.log("produktu nie ma jeszcze w koszyku dodaj go");
        }
      } else if (item.parentCategoryId === "2") {
        console.log("dodaj Product do koszyka");
      } else if (item.parentCategoryId === "3") {
        console.log("dodaj Danie do koszyka");
      } else if (item.parentCategoryId === "4") {
        console.log("dodaj Listę do koszyka");
      }
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
