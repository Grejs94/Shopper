import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { toggleBottomBarIconsSlice } from "features";

export default configureStore({
  reducer: {
    counter: counterReducer,
    editBottomIcons: toggleBottomBarIconsSlice,
  },
});
