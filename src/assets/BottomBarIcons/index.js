import {
  toggleEditIcon,
  toggleAddIcon,
  toggleRemoveIcon,
} from "features/toggleBottomBarIconsSlice/toggleBottomBarIconsSlice";

import { setBasketHistory } from "features/createBasketHistory/createBasketHistorySlice";

export const IconsBottomEditVariant = [
  {
    name: "save",
    onClick: setBasketHistory,
  },
  {
    name: "add",
    onClick: toggleAddIcon,
  },
  {
    name: "remove",
    onClick: toggleRemoveIcon,
  },
  {
    name: "edit",
    onClick: toggleEditIcon,
  },
];

export const IconsBottomListVariant = [
  {
    name: "save",
    onClick: setBasketHistory,
  },
  {
    name: "edit",
    onClick: toggleEditIcon,
  },
];
