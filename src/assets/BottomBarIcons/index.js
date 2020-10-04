import {
  toggleEditIcon,
  toggleAddIcon,
  toggleRemoveIcon,
} from "features/toggleBottomBarIconsSlice/toggleBottomBarIconsSlice";

import { setBasketHistory } from "features/createBasketHistory/createBasketHistorySlice";

export const IconsBottomEditVariant = [
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
    name: "edit",
    onClick: toggleEditIcon,
  },
];

export const saveIconArray = [
  {
    name: "save",
    onClick: setBasketHistory,
  },
];
