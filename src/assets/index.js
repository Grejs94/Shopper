export * from "assets/PagesIcons";
export * from "assets/BottomBarIcons";
export * from "./StyledComponents";

export const incrementedString = (string, value) => {
  console.log(string);
  console.log(value);

  const number = parseInt(value);
  console.log(number);
  const stringAsNumber = parseInt(string);
  console.log(stringAsNumber);
  const sum = stringAsNumber + number;
  console.log(sum);
  const sumAsString = sum.toString();
  console.log(sumAsString);
  return sumAsString.toString();
};
