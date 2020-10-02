import React from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  selectDishes,
  selectSavedList,
  toggleDishesButton,
  toggleSavedListButton,
} from "features/showMore/showMoreSlice";

import {
  ListContainer,
  CategoryTitleList,
  ListElement,
  ParentTitleList,
} from "assets/StyledComponents/ItemsDisplayed.css";
import {
  Button,
  Dishes,
  ListElementDishesShow,
} from "./HistoryParentCategoryList.css";

import { incrementedString } from "assets";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const HistoryParentCategoryList = ({
  parentsTitle = [],
  filtredCategories = [],
  itemsList = [],
}) => {
  const dispatch = useDispatch();

  const toggleDishes = useSelector(selectDishes);
  const toggleSavedList = useSelector(selectSavedList);

  return (
    <ListContainer>
      {itemsList.length > 0 ? (
        <>
          <ParentTitleList>{`${parentsTitle}:`}</ParentTitleList>
        </>
      ) : null}
      {filtredCategories.map((category) => {
        const ItemsList = itemsList.filter(
          (item) => item.categoryId === category.id
        );

        if (ItemsList.length === 0) {
          return null;
        }

        const createItemsList = (
          <>
            {ItemsList.map((item) => {
              return (
                <ListElement key={item.name}>
                  {item.value > 1
                    ? `${item.name}(${item.value}),`
                    : `${item.name},`}
                </ListElement>
              );
            })}
          </>
        );

        const createItemsListToDishes =
          category.parentCategoryId === "3" &&
          ItemsList.map((dishes) => {
            return (
              <div key={dishes.name}>
                <Dishes>{`${dishes.name}:`}</Dishes>
                {dishes.itemsIncluded.map((item) => {
                  const value = item.value * dishes.value;
                  return (
                    <ListElementDishesShow key={item.name}>
                      {value > 1 ? `${item.name}(${value}),` : `${item.name},`}
                    </ListElementDishesShow>
                  );
                })}
              </div>
            );
          });

        const createItemsListToSavedListDetails =
          category.parentCategoryId === "4" &&
          ItemsList.map((SavedList) => {
            const savedListDishesMap = SavedList.dishes.map((dishes) => {
              const value = dishes.value * SavedList.value;

              return (
                <ListElementDishesShow key={dishes.name}>
                  {value > 1 ? `${dishes.name}(${value}),` : `${dishes.name},`}
                </ListElementDishesShow>
              );
            });

            const savedListItemsMap = SavedList.items.map((item) => {
              const value = item.value * SavedList.value;
              return (
                <ListElementDishesShow key={item.name}>
                  {value > 1 ? `${item.name}(${value}),` : `${item.name},`}
                </ListElementDishesShow>
              );
            });

            return (
              <div key={SavedList.id}>
                <Dishes>{`${SavedList.name}:`}</Dishes>
                <Dishes>Dishes:</Dishes>
                {savedListDishesMap}
                <Dishes>Items:</Dishes>
                {savedListItemsMap}
              </div>
            );
          });

        const createItemsListToSavedListShowMoreFc = (ItemsList, category) => {
          if (category.parentCategoryId !== "4") {
            return null;
          }

          const savedListsMap = ItemsList.map((SavedList) => {
            const itemsFromDishes = [];
            const savedListItems = [];

            SavedList.dishes.map((dishes) => {
              dishes.itemsIncluded.map((item) => {
                const itemValue = item.value * dishes.value * SavedList.value;
                itemsFromDishes.push({
                  ...item,
                  value: itemValue,
                });
                return null;
              });

              return null;
            });

            SavedList.items.map((item) => {
              const itemValue = item.value * SavedList.value;
              savedListItems.push({
                ...item,
                value: itemValue,
              });
              return null;
            });

            const allItems = [...itemsFromDishes, ...savedListItems];

            const HashmapAllItems = allItems.reduce((obj, item) => {
              obj[item.id]
                ? (obj[item.id].value = incrementedString(
                    obj[item.id].value,
                    item.value
                  ))
                : (obj[item.id] = { ...item });
              return obj;
            }, {});

            const mergedArrayAllItems = Object.values(HashmapAllItems);

            const savedListItemsAll = mergedArrayAllItems.map((item) => {
              return (
                <ListElementDishesShow key={item.name}>
                  {item.value > 1
                    ? `${item.name}(${item.value}),`
                    : `${item.name},`}
                </ListElementDishesShow>
              );
            });

            return (
              <div key={SavedList.id}>
                <Dishes>{`${SavedList.name}:`}</Dishes>
                <Dishes>Items:</Dishes>
                <div>{savedListItemsAll}</div>
              </div>
            );
          });
          return savedListsMap;
        };

        return (
          <div key={category.name}>
            <CategoryTitleList>
              {capitalizeFirstLetter(`${category.name}:`)}
              {category.parentCategoryId === "3" ? (
                <Button onClick={() => dispatch(toggleDishesButton())}>
                  {toggleDishes ? "show overall" : "show details"}
                </Button>
              ) : category.parentCategoryId === "4" ? (
                <Button onClick={() => dispatch(toggleSavedListButton())}>
                  {toggleSavedList === "overAll"
                    ? "show details"
                    : toggleSavedList === "details"
                    ? "show more"
                    : toggleSavedList === "all"
                    ? "show overall"
                    : "przycisk"}
                </Button>
              ) : null}
              {category.parentCategoryId === "1" ||
              category.parentCategoryId === "2"
                ? createItemsList
                : null}
              {category.parentCategoryId === "3" && toggleDishes
                ? createItemsListToDishes
                : category.parentCategoryId === "3"
                ? createItemsList
                : null}

              {category.parentCategoryId === "4" &&
              toggleSavedList === "details"
                ? createItemsListToSavedListDetails
                : category.parentCategoryId === "4" && toggleSavedList === "all"
                ? createItemsListToSavedListShowMoreFc(ItemsList, category)
                : category.parentCategoryId === "4"
                ? createItemsList
                : null}
            </CategoryTitleList>
          </div>
        );
      })}
    </ListContainer>
  );
};

export default HistoryParentCategoryList;
