import { useQuery } from "react-query";

export function useMyshops() {
  return useQuery("myshops", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/myshops`).then((res) =>
      res.json()
    )
  );
}
