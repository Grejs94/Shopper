import React from "react";
import { createPortal } from "react-dom";
import { useHistory } from "react-router-dom";

import { Wrapper, Content, CloseIcon } from "./Modal.css";

const Modal = ({ children }) => {
  const history = useHistory();
  const handleClose = () => {
    history.goBack();
  };

  return createPortal(
    <Wrapper onClick={handleClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <CloseIcon onClick={handleClose}>&times;</CloseIcon>
        {children}
      </Content>
    </Wrapper>,
    document.querySelector("#modals")
  );
};

export default Modal;
