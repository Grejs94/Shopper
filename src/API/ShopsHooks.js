import { useQuery } from "react-query";

export function useMyshops() {
  return useQuery("shops", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/shops`).then((res) => res.json())
  );
}
