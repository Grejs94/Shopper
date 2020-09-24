import { useParentCategory, useCategory } from "hooks/API/ItemsCategoriesHooks";

import { UseDishesCategory, UseDishes } from "hooks/API/DishesHooks";

import { useSavedList, useSavedListsCategories } from "./SavedListsHooks";

import { useBasket, addBasketItem } from "./BasketHooks";

import { useMyshops } from "./ShopsHooks";

import { useItems } from "./ItemsHooks";

export default {
  useParentCategory,
  useCategory,
  useItems,
  // useAddItem,
  UseDishesCategory,
  UseDishes,
  useSavedList,
  useSavedListsCategories,
  useBasket,
  addBasketItem,
  useMyshops,
};
