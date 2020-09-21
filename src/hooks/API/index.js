import {
  useParentCategory,
  useCategory,
  useItems,
} from "hooks/API/HookCategory";

import { UseDishesCategory, UseDishes } from "hooks/API/DishesHooks";

import { useSavedList } from "./SavedListsHooks";

export default {
  useParentCategory,
  useCategory,
  useItems,
  UseDishesCategory,
  UseDishes,
  useSavedList,
};
