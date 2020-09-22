import styled from "styled-components";

export const SquareContainer = styled.div`
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
  text-align: center;
`;

export const ParentTitle = styled.p`
  text-align: center;
  font-size: 26px;
  margin: 20px 0;
`;

export const CategoryTitle = styled.p`
  font-size: 22px;
  text-align: center;
  margin: 20px 0;
`;

export const HideTheMenuWhenScrollIntoView = styled.div`
  min-height: 100px;
`;
