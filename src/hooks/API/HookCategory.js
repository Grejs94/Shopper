import { useQuery } from "react-query";

export function useCategory() {
  return useQuery("category", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/category`).then((res) =>
      res.json()
    )
  );
}

// export const useCategory = async () => {
//   const res = await fetch(`${process.env.REACT_APP_LOCAL_HTTP}/category`);
//   const fetchCategory = await res.json();
//   return useQuery("category", fetchCategory);
// };
