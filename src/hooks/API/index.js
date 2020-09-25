import { useParentCategory, useCategory } from "hooks/API/ItemsCategoriesHooks";

import { UseDishesCategory, UseDishes } from "hooks/API/DishesHooks";

import { useSavedList, useSavedListsCategories } from "./SavedListsHooks";

import {
  useBasketGroceres,
  useBasketProducts,
  useBasketDishes,
  useBasketSavedLists,
  useAddBasketGroceries,
  useAddBasketProducts,
  useAddBasketDishes,
  useAddBasketSavedLists,
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
  useBasketGroceres,
  useBasketProducts,
  useBasketDishes,
  useBasketSavedLists,
  useAddBasketGroceries,
  useAddBasketProducts,
  useAddBasketDishes,
  useAddBasketSavedLists,
  useMyshops,
};
