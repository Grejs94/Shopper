import { useQuery, useMutation, queryCache } from "react-query";

export function useItems() {
  return useQuery("items", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/items`).then((res) => res.json())
  );
}
