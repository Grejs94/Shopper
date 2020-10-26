import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
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
} from 'features'

export default configureStore({
  reducer: {
    counter: counterReducer,
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
  },
})
