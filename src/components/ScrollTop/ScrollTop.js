import React from "react";

import { TurnedSymbol, SymbolContainer } from "./ScrollTop.css";

const ScrollTop = ({ value }) => {
  const checkpoint = value;
  let opacity;
  let display;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= checkpoint) {
      display = "none";
      opacity = 0;
    } else {
      display = "flex";
      opacity = currentScroll * 0.0008;
    }
    document.querySelector("#scroll").style.opacity = opacity;
    document.querySelector("#scroll").style.display = display;
  });

  return (
    <SymbolContainer id="scroll">
      <TurnedSymbol
        onClick={() =>
          document.body.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          })
        }
      >
        &laquo;
      </TurnedSymbol>
    </SymbolContainer>
  );
};

export default ScrollTop;
