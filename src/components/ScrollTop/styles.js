import styled from "styled-components";

export const TurnedSymbol = styled.span`
  transform: rotate(90deg) translateY(-10.5px);
  font-size: 100px;
  display: inline-block;
  line-height: 70px;
  margin: 0 auto;
`;

export const SymbolContainer = styled.div`
  display: none;
  background-color: rgba(211, 211, 211, 0.8);
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 20px;
  right: 40px;
  width: 60px;
  height: 60px;
  cursor: pointer;
  opacity: 0;
`;
