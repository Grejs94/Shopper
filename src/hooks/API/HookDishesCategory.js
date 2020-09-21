import { useQuery } from "react-query";

export function HookDishesCategory() {
  return useQuery("dishesCategories", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/dishesCategories`).then((res) =>
      res.json()
    )
  );
}
