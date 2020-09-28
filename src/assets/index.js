export * from "assets/PagesIcons";
export * from "assets/BottomBarIcons";
export * from "./StyledComponents";

export const incrementedString = (string, value) => {
  const number = parseInt(value);
  const stringAsNumber = parseInt(string);
  const sum = stringAsNumber + number;
  const sumAsString = sum.toString();
  return sumAsString.toString();
};
