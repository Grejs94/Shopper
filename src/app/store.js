import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import {
  toggleBottomBarIconsSlice,
  category as categoryReducer,
  activeMenuIconSlice as activeMenuIconReducer,
} from "features";

export default configureStore({
  reducer: {
    counter: counterReducer,
    editBottomIcons: toggleBottomBarIconsSlice,
    category: categoryReducer,
    activeMenuIcon: activeMenuIconReducer,
  },
});
