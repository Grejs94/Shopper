import React from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  setBasketHistory,
  setFakeHistory,
} from "features/createBasketHistory/createBasketHistorySlice";

import API from "hooks/API";

import {
  Info,
  Button,
  ButtonContainer,
  Wrapper,
} from "./CreateHistoryModalContent.css";

const CreateHistoryModalContent = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const useBasketGroceres = API.useBasketGroceres();
  const useBasketProducts = API.useBasketProducts();
  const useBasketDishes = API.useBasketDishes();
  const useBasketSavedLists = API.useBasketSavedLists();

  // const [mutate_Post_History] = API.useAddHistory();
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
    console.log(useBasketGroceres.data);
    console.log(useBasketProducts.data);
    console.log(useBasketDishes.data);
    console.log(useBasketSavedLists.data);

    return (
      <Wrapper>
        <Info>Do you want to save your shopping list?</Info>
        <ButtonContainer>
          <Button
            onClick={() => {
              dispatch(setBasketHistory());
              // mutate_Post_History({
              //   data: {
              //     ...item,
              //     value: "1",
              //   },
              // }).then(
              //   toast.success(
              //     `The ${parentCategoryName}: "${item.name}" has been successfully added to your basket`
              //   ))
              console.log("wyślij listę zakupów");
              history.goBack();
            }}
          >
            yes, save my list
          </Button>
          <Button
            onClick={() => {
              dispatch(setFakeHistory());
              history.goBack();
            }}
          >
            no, skip that.
          </Button>
        </ButtonContainer>
      </Wrapper>
    );
  }
};

export default CreateHistoryModalContent;
