import {
  toggleEditIcon,
  toggleAddIcon,
  toggleRemoveIcon,
} from "features/toggleBottomBarIconsSlice/toggleBottomBarIconsSlice";

export const IconsBottomEditVariant = [
  {
    name: "edit",
    onClick: toggleEditIcon,
  },
];

export const IconsBottomListVariant = [
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
