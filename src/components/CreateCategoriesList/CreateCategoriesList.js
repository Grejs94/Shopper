import React from "react";

import { useMutation } from "react-query";

import {
  SquareContainer,
  Square,
  Content,
  ParentTitle,
  CategoryTitle,
} from "assets/StyledComponents/ItemsDisplayed.css";

import API from "hooks/API";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const CreateCategoriesList = ({
  parentsTitle,
  filtredCategories,
  itemsList,
}) => {
  const [mutate] = useMutation(API.addBasketItem);
  // console.log(mutate);

  // itemId
  // value

  const handleAddElementToBasket = (item) => {
    mutate({
      data: {
        itemId: item.id,
        value: "1",
      },
    }).then(() => {
      console.log("dodane");
    });
  };

  return (
    <div>
      <ParentTitle>{parentsTitle}</ParentTitle>
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
              {ItemsList.map((item) => (
                <Square
                  key={item.id}
                  onClick={() => handleAddElementToBasket(item)}
                >
                  <Content>{item.name}</Content>
                </Square>
              ))}
            </SquareContainer>
          </div>
        );
      })}
    </div>
  );
};

export default CreateCategoriesList;
