import styled from "styled-components";

export const Wrapper = styled.div`
  position: sticky;
  top: 70px;
  left: 0;
  width: 100%;
  background-color: white;
  text-align: center;
  padding: 2px 0 10px;
  z-index: 2;

  @media (max-width: 330px) {
    top: 60px;
  }

  // position: sticky;
  // font-size: 20px;
  // text-align: center;
  // top: 0;
  // left: 0;
  // width: 100%;
  // z-index: 1;
  // background-color: white;

  // @media (max-width: 330px) {
  //   font-size: 18px;
  // }
`;
