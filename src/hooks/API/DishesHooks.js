import { useQuery } from "react-query";

export function UseDishesCategory() {
  return useQuery("dishesCategories", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/dishesCategories`).then((res) =>
      res.json()
    )
  );
}

export function UseDishes() {
  return useQuery("dishes", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/dishes`).then((res) =>
      res.json()
    )
  );
}
