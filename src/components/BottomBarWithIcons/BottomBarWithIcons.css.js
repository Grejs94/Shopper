import styled from "styled-components";

export const Wrapper = styled.div`
  position: sticky;
  background-color: white;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  padding: 10px 0;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
`;

export const ContainerReturnIcon = styled.div`
  margin-left: 10px;
`;

export const ContainerRestIcons = styled.div`
  display: flex;
  align-items: center;

  div {
    margin-right: 10px;
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
