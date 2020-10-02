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
    restOnClick: () => console.log("wysyłam do historii"),
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
    restOnClick: () => console.log("wysyłam do historii"),
  },
  {
    name: "edit",
    onClick: toggleEditIcon,
  },
];
