import { useQuery } from "react-query";

export function useCategory() {
  return useQuery("category", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/category`).then((res) =>
      res.json()
    )
  );
}

export function useItems() {
  return useQuery("items", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/items`).then((res) => res.json())
  );
}

export function useParentCategory() {
  return useQuery("parentCategory", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/parentCategory`).then((res) =>
      res.json()
    )
  );
}
