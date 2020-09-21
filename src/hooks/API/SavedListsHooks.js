import { useQuery } from "react-query";

export function useSavedList() {
  return useQuery("savedLists", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/savedLists`).then((res) =>
      res.json()
    )
  );
}
