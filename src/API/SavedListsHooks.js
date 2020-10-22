import { useQuery } from "react-query";

export function useSavedList() {
  return useQuery("savedLists", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/savedLists`).then((res) =>
      res.json()
    )
  );
}

export function useSavedListsCategories() {
  return useQuery("savedListsCategories", () =>
    fetch(
      `${process.env.REACT_APP_LOCAL_HTTP}/savedListsCategories`
    ).then((res) => res.json())
  );
}
