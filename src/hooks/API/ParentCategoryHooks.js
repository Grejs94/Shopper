import { useQuery } from "react-query";

export function useParentCategories() {
  return useQuery("parentCategories", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/parentCategories`).then((res) =>
      res.json()
    )
  );
}
