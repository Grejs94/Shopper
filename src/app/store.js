import { configureStore } from '@reduxjs/toolkit'
import {
  toggleBottomBarIconsSlice,
  category as categoryReducer,
  activeMenuIconSlice as activeMenuIconReducer,
  showMoreSlice as showMoreSliceReducer,
  createBasketHistorySlice as createBasketHistoryReducer,
  groceriesSlice as groceriesReducer,
  productsSlice as productsReducer,
  dishesSlice as dishesReducer,
  savedListSlice as savedListReducer,
  parentCategoriesSlice as parentCategoriesReducer,
  historySlice as historyReducer,
  settingsSlice as settingsReducer,
} from 'features'

export default configureStore({
  reducer: {
    editBottomIcons: toggleBottomBarIconsSlice,
    category: categoryReducer,
    activeMenuIcon: activeMenuIconReducer,
    showMore: showMoreSliceReducer,
    BasketHistory: createBasketHistoryReducer,
    groceries: groceriesReducer,
    products: productsReducer,
    dishes: dishesReducer,
    savedList: savedListReducer,
    parentCategories: parentCategoriesReducer,
    history: historyReducer,
    settings: settingsReducer,
  },
})
