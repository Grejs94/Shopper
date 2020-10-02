import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import API from "hooks/API";

import {
  Wrapper,
  ContainerReturnIcon,
  ContainerRestIcons,
  IconElement,
  Img,
} from "./BottomBarWithIcons.css";

import {
  list_coloredImg,
  edit_coloredImg,
  return_blackImg,
  return_coloredImg,
  add_blackImg,
  add_coloredImg,
  remove_blackImg,
  remove_coloredImg,
  save_blackImg,
  save_coloredImg,
} from "pictures";

import {
  selectEditIcon,
  selectAddIcon,
  selectRemoveIcon,
  resetEditIcon,
} from "features/toggleBottomBarIconsSlice/toggleBottomBarIconsSlice";

import { selectBasketHistory } from "features/createBasketHistory/createBasketHistorySlice";

function BottomBarWithIcons({ icons }) {
  const useBasketGroceres = API.useBasketGroceres();
  const useBasketProducts = API.useBasketProducts();
  const useBasketDishes = API.useBasketDishes();
  const useBasketSavedLists = API.useBasketSavedLists();

  const [mutate_Post_History] = API.useAddHistory();

  const dispatch = useDispatch();
  const editIcon = useSelector(selectEditIcon);
  const addIcon = useSelector(selectAddIcon);
  const removeIcon = useSelector(selectRemoveIcon);
  const BasketHistory = useSelector(selectBasketHistory);

  const history = useHistory();

  if (
    useBasketGroceres.isError ||
    useBasketProducts.isError ||
    useBasketDishes.isError ||
    useBasketSavedLists.isError
  ) {
    return "Fetching date error...";
  } else if (
    useBasketGroceres.isLoading ||
    useBasketProducts.isLoading ||
    useBasketDishes.isLoading ||
    useBasketSavedLists.isLoading
  ) {
    return "Loading date...";
  } else if (
    useBasketGroceres.isSuccess &&
    useBasketProducts.isSuccess &&
    useBasketDishes.isSuccess &&
    useBasketSavedLists.isSuccess
  ) {
    const handleMouseDownIcon = () => {
      const img = document.querySelector("#returnIcon");
      img.setAttribute("src", return_coloredImg);
    };

    const handleMouseUpIcon = () => {
      const img = document.querySelector("#returnIcon");
      img.setAttribute("src", return_blackImg);
    };

    const resetIcon = (
      <IconElement>
        <Img
          id="returnIcon"
          src={return_blackImg}
          onMouseDown={() => handleMouseDownIcon()}
          onMouseUp={() => handleMouseUpIcon()}
          onClick={() => {
            history.goBack();
            dispatch(resetEditIcon());
          }}
        ></Img>
      </IconElement>
    );

    const IconSwitch = (icon) => {
      switch (icon) {
        case "save":
          if (BasketHistory === false) {
            return save_blackImg;
          } else {
            return save_coloredImg;
          }
        case "edit":
          if (editIcon === false) {
            return list_coloredImg;
          } else {
            return edit_coloredImg;
          }
        case "add":
          if (addIcon === false) {
            return add_blackImg;
          } else {
            return add_coloredImg;
          }
        case "remove":
          if (removeIcon === false) {
            return remove_blackImg;
          } else {
            return remove_coloredImg;
          }

        default:
          return;
      }
    };

    const restIconsList =
      icons &&
      icons.map(({ name, onClick }) => (
        <IconElement
          key={name}
          onClick={() => {
            dispatch(onClick());
            if (name === "save") {
              if (BasketHistory) {
                return;
              } else {
                mutate_Post_History({
                  data: {
                    saved: new Date(),
                    groceries: [...useBasketGroceres.data],
                    products: [...useBasketProducts.data],
                    dishes: [...useBasketDishes.data],
                    savedLists: [...useBasketSavedLists.data],
                  },
                }).then(
                  toast.success(`the shopping list has been added to history `)
                );
              }
            }
          }}
        >
          <Img src={IconSwitch(name)}></Img>
        </IconElement>
      ));

    return (
      <Wrapper>
        <ContainerReturnIcon>{resetIcon}</ContainerReturnIcon>
        <ContainerRestIcons>{restIconsList}</ContainerRestIcons>
      </Wrapper>
    );
  }
}
export default BottomBarWithIcons;
