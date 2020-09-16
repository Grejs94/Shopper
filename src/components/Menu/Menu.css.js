import styled from "styled-components";

export const Wrapper = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  z-index: 2;
`;

export const LogoContainer = styled.div`
  margin: 0 10px;
  font-size: 25px;
  text-decoration: none;

  @media (max-width: 330px) {
    font-size: 20px;
    margin: 0 5px;
  }
`;

export const LogoElement = styled.div`
  height: 100%;
`;

export const IconsContainer = styled.div`
  display: flex;
  align-items: center;

  div {
    margin-right: 10px;
  }

  div:first-child {
    border-right: 1px dashed black;
    padding-right: 10px;
  }

  @media (max-width: 330px) {
    div {
      margin-right: 0;
    }

    div:first-child {
      border-right: none;
    }
  }
`;

export const IconElement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 50px;
  max-height: 50px;

  @media (max-width: 330px) {
    max-width: 40px;
    max-height: 40px;
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;
