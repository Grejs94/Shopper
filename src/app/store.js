import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import {
  toggleBottomBarIconsSlice,
  category as categoryReducer,
  activeMenuIconSlice as activeMenuIconReducer,
  showMoreSlice as showMoreSliceReducer,
  createBasketHistorySlice as createBasketHistoryReducer,
} from "features";

export default configureStore({
  reducer: {
    counter: counterReducer,
    editBottomIcons: toggleBottomBarIconsSlice,
    category: categoryReducer,
    activeMenuIcon: activeMenuIconReducer,
    showMore: showMoreSliceReducer,
    BasketHistory: createBasketHistoryReducer,
  },
});
