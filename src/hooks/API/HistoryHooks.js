import { useQuery, queryCache, useMutation } from "react-query";

export function useHistory() {
  return useQuery("history", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/history`).then((res) =>
      res.json()
    )
  );
}

const addHistory = async ({ data }) => {
  const response = await fetch(`${process.env.REACT_APP_LOCAL_HTTP}/history`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

export function useAddHistory() {
  return useMutation(addHistory, {
    onSuccess() {
      queryCache.invalidateQueries("history");
    },
  });
}
