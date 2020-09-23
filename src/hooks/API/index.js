import {
  useParentCategory,
  useCategory,
  useItems,
} from "hooks/API/HookCategory";

import { UseDishesCategory, UseDishes } from "hooks/API/DishesHooks";

import { useSavedList } from "./SavedListsHooks";

import { useBasket } from "./BasketHooks";

import { useMyshops } from "./ShopsHooks";

export default {
  useParentCategory,
  useCategory,
  useItems,
  UseDishesCategory,
  UseDishes,
  useSavedList,
  useBasket,
  useMyshops,
};
