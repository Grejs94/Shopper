import React from "react";
import { createPortal } from "react-dom";
import { useHistory } from "react-router-dom";

import {
  Wrapper,
  Content,
  CloseIcon,
  ChildrenContainer,
  ChildrenInfo,
} from "./Modal.css";

const Modal = ({ message, children }) => {
  const history = useHistory();
  const handleClose = () => {
    history.goBack();
  };

  return createPortal(
    <Wrapper onClick={handleClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <CloseIcon onClick={handleClose}>&times;</CloseIcon>
        {message ? (
          <ChildrenContainer>
            <ChildrenInfo>{message}</ChildrenInfo>
          </ChildrenContainer>
        ) : null}
        {children}
      </Content>
    </Wrapper>,
    document.querySelector("#modals")
  );
};

export default Modal;
