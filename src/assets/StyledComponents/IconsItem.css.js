import styled from "styled-components";

export const ItemsContainer = styled.div`
  display: flex;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

export const EmptyItem = styled.div`
  flex-grow: 1;
`;

export const ItemPictureContainer = styled.div`
  max-width: 30px;
  max-height: 30px;
`;

export const ItemPicture = styled.img`
  width: 100%;
  height: 100%;
`;

export const ItemText = styled.span`
  margin-left: 5px;
`;
