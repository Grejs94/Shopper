import { useParentCategory, useCategory } from "hooks/API/ItemsCategoriesHooks";

import { UseDishesCategory, UseDishes } from "hooks/API/DishesHooks";

import { useSavedList, useSavedListsCategories } from "./SavedListsHooks";

import {
  addBasketGroceries,
  useAddBasketGroceries,
  useAddBasketProducts,
  useAddBasketDishes,
  useAddBasketSavedLists,
  addBasketProducts,
  addBasketDishes,
  addBasketSavedLists,
  useBasketGroceres,
  useBasketProducts,
  useBasketDishes,
  useBasketSavedLists,
} from "./BasketHooks";

import { useMyshops } from "./ShopsHooks";

import { useGroceres, useGroceriesCategories } from "./GroceriesHooks";

import { useProducts, useProductsCategories } from "./ProductsHooks";

export default {
  useParentCategory,
  useCategory,
  useGroceres,
  useGroceriesCategories,
  useProducts,
  useProductsCategories,
  UseDishesCategory,
  UseDishes,
  useSavedList,
  useSavedListsCategories,
  addBasketGroceries,
  useAddBasketGroceries,
  useAddBasketProducts,
  useAddBasketDishes,
  useAddBasketSavedLists,
  addBasketProducts,
  addBasketDishes,
  addBasketSavedLists,
  useBasketGroceres,
  useBasketProducts,
  useBasketDishes,
  useBasketSavedLists,
  useMyshops,
};
