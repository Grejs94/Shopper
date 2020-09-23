import { useQuery } from "react-query";

export function useBasket() {
  return useQuery("basket", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/basket`).then((res) =>
      res.json()
    )
  );
}
