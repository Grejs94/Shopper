import React from "react";

import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import {
  selectEditIcon,
  selectAddIcon,
  selectRemoveIcon,
} from "features/toggleBottomBarIconsSlice/toggleBottomBarIconsSlice";
import { selectActiveMenuIcon } from "features/activeMenuIcon/activeMenuIconSlice";
import {
  selectDishes,
  selectSavedList,
  toggleDishesButton,
  toggleSavedListButton,
} from "features/showMore/showMoreSlice";

import {
  SquareContainer,
  Square,
  Content,
  ParentTitle,
  CategoryTitle,
  HideTheMenuWhenScrollIntoView,
  ListContainer,
  CategoryTitleList,
  ListElementContainer,
  ListElement,
  ParentTitleList,
} from "assets/StyledComponents/ItemsDisplayed.css";
import {
  Button,
  Dishes,
  ListElementDishesShow,
} from "./CreateCategoriesList.css";

import API from "hooks/API";

import { incrementedString } from "assets";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const CreateCategoriesList = ({
  parentsTitle,
  filtredCategories,
  itemsList,
}) => {
  const dispatch = useDispatch();

  const editMode = useSelector(selectEditIcon);
  const addIcon = useSelector(selectAddIcon);
  const removeIcon = useSelector(selectRemoveIcon);
  const toggleDishes = useSelector(selectDishes);
  const toggleSavedList = useSelector(selectSavedList);

  const activeMenuIcon = useSelector(selectActiveMenuIcon);

  // console.log(editMode);

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

  // Delete

  const [mutate_DELETE_BasketGroceries] = API.useDeleteBasketGroceries();
  const [mutate_DELETE_BasketProducts] = API.useDeleteBasketProducts();
  const [mutate_DELETE_BasketDishes] = API.useDeleteBasketDishes();
  const [mutate_DELETE_BasketSavedLists] = API.useDeleteBasketSavedLists();

  // useDeleteBasketGroceries
  // useDeleteBasketProducts
  // useDeleteBasketDishes
  // useDeleteBasketSavedLists

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
    const handleOnClick = (item) => {
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

      // need be in correct order
      const mutateDeleteFunctions = [
        mutate_DELETE_BasketGroceries,
        mutate_DELETE_BasketProducts,
        mutate_DELETE_BasketDishes,
        mutate_DELETE_BasketSavedLists,
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
          if (activeMenuIcon === "basket") {
            if (addIcon) {
              const basketItem = findElement[0];
              const incrementValue = incrementedString(basketItem.value, "1");

              mutatePutFunctions[index]({
                id: item.id,
                data: {
                  ...basketItem,
                  value: incrementValue,
                },
              });
            }

            if (removeIcon) {
              if (item.value > 1) {
                const basketItem = findElement[0];
                const reduced = incrementedString(basketItem.value, "-1");

                mutatePutFunctions[index]({
                  id: item.id,
                  data: {
                    ...basketItem,
                    value: reduced,
                  },
                });
              } else {
                mutateDeleteFunctions[index]({
                  id: item.id,
                });
              }
            }
          } else if (activeMenuIcon === "shop") {
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
          }
        } else {
          return null;
        }
        return null;
      });
    };

    const editModeContent = (
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

    const listModeContent = (
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
            <ListElementContainer>
              {ItemsList.map((item) => {
                return (
                  <ListElement key={item.name}>
                    {item.value > 1
                      ? `${item.name}(${item.value}),`
                      : `${item.name},`}
                  </ListElement>
                );
              })}
            </ListElementContainer>
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
                        {value > 1
                          ? `${item.name}(${value}),`
                          : `${item.name},`}
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
                    {value > 1
                      ? `${dishes.name}(${value}),`
                      : `${dishes.name},`}
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

          const createItemsListToSavedListShowMoreFc = (
            ItemsList,
            category
          ) => {
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
              </CategoryTitleList>
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
            </div>
          );
        })}
      </ListContainer>
    );

    return activeMenuIcon === "shop"
      ? editModeContent
      : editMode
      ? editModeContent
      : listModeContent;
  }
};

export default CreateCategoriesList;
