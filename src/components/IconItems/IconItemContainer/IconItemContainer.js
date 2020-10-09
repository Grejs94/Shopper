import React from "react";

import { ItemsContainer, EmptyItem } from "./IconItemContainer.css";

const IconItemContainer = ({ children, addStyles }) => {
  return (
    <ItemsContainer style={addStyles}>
      {children}
      <EmptyItem />
    </ItemsContainer>
  );
};

export default IconItemContainer;
