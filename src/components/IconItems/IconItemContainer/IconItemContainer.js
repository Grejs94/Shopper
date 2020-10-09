import React from "react";

import { ItemsContainer, EmptyItem } from "./IconItemContainer.css";

const IconItemContainer = ({ children }) => {
  return (
    <ItemsContainer>
      {children}
      <EmptyItem />
    </ItemsContainer>
  );
};

export default IconItemContainer;
