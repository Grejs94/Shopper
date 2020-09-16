import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const SquareContainer = styled.div`
  flex-basis: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 20px;
  padding: 0 20px;

  @media (max-width: 395px) {
    gap: 15px;
    padding: 0 15px;
  }
`;

export const Square = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  border-radius: 2px;

  ::before {
    content: "";
    padding-bottom: 100%;
    display: block;
  }
`;

export const Content = styled.div`
  position: absolute;
`;

export const Span = styled.span`
  font-size: 18px;
  margin: 20px 0;
`;
