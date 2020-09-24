import { useQuery } from "react-query";

export function useBasket() {
  return useQuery("basket", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/basket`).then((res) =>
      res.json()
    )
  );
}

export const addBasketItem = async ({ data }) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCAL_HTTP}/basketItems`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return await response.json();
};

// export function useAddItem() {
//   return useMutation(addItem, {
//     onSuccess() {
//       queryCache.invalidateQueries("items");
//     },
//   });
// }
