import { useQuery } from "react-query";

export function useParentCategory() {
  return useQuery("parentCategory", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/parentCategory`).then((res) =>
      res.json()
    )
  );
}
