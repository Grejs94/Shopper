import { useQuery, queryCache, useMutation } from "react-query";

export function useSettings() {
  return useQuery("settings", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/settings`).then((res) =>
      res.json()
    )
  );
}

const putSettings = async ({ data }) => {
  const response = await fetch(`${process.env.REACT_APP_LOCAL_HTTP}/settings`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

export function usePutSettings() {
  return useMutation(putSettings, {
    onSuccess() {
      queryCache.invalidateQueries("settings");
    },
  });
}
