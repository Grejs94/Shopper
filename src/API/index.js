import { useParentCategories } from 'API/ParentCategoryHooks'

import { UseDishesCategory, UseDishes } from 'API/DishesHooks'

import { useSavedList, useSavedListsCategories } from './SavedListsHooks'

import {
  useBasketGroceres,
  useBasketProducts,
  useBasketDishes,
  useBasketSavedLists,
  useAddBasketGroceries,
  useAddBasketProducts,
  useAddBasketDishes,
  useAddBasketSavedLists,
  usePutBasketGroceries,
  usePutBasketProducts,
  usePutBasketDishes,
  usePutBasketSavedLists,
  useDeleteBasketGroceries,
  useDeleteBasketProducts,
  useDeleteBasketDishes,
  useDeleteBasketSavedLists,
} from './BasketHooks'

import { useMyshops } from './ShopsHooks'

import { useGroceres, useGroceriesCategories } from './GroceriesHooks'

import { useProducts, useProductsCategories } from './ProductsHooks'

import { useHistory, useAddHistory, useDeleteHistory } from './HistoryHooks'

import { useSettings, usePutSettings } from './SettingsHooks'

export default {
  useParentCategories,
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
  usePutBasketGroceries,
  usePutBasketProducts,
  usePutBasketDishes,
  usePutBasketSavedLists,
  useDeleteBasketGroceries,
  useDeleteBasketProducts,
  useDeleteBasketDishes,
  useDeleteBasketSavedLists,
  useMyshops,
  useHistory,
  useAddHistory,
  useDeleteHistory,
  useSettings,
  usePutSettings,
}