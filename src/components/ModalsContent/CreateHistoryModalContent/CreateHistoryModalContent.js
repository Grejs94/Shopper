import React from "react";

import {
  Info,
  Button,
  ButtonContainer,
  Wrapper,
} from "./CreateHistoryModalContent.css";

const CreateHistoryModalContent = () => {
  return (
    <Wrapper>
      <Info>Do you want to save your shopping list?</Info>
      <ButtonContainer>
        <Button>yes, save my list</Button>
        <Button>no, skip that.</Button>
      </ButtonContainer>
    </Wrapper>
  );
};

export default CreateHistoryModalContent;
