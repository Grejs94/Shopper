import React from "react";

import {
  SquareContainer,
  Square,
  Content,
  ParentTitle,
  CategoryTitle,
} from "assets/StyledComponents/ItemsDisplayed.css";

function CreateCategoriesList({ parentsTitle, filtredCategories, itemsList }) {
  if (itemsList.isError) {
    return "Data download error...";
  } else if (itemsList.isLoading) {
    return "Loading data...";
  } else if (itemsList.isSuccess) {
    return (
      <div>
        <ParentTitle>{parentsTitle}</ParentTitle>
        {filtredCategories.map((category) => {
          const ItemsList = itemsList.data.filter(
            (item) => item.categoryId === category.id
          );

          if (ItemsList.length === 0) {
            return;
          }

          return (
            <div key={category.name}>
              <CategoryTitle>{category.name}</CategoryTitle>
              <SquareContainer>
                {ItemsList.map((item) => (
                  <Square key={item.id}>
                    <Content>{item.name}</Content>
                  </Square>
                ))}
              </SquareContainer>
            </div>
          );
        })}
      </div>
    );
  }
}

export default CreateCategoriesList;
