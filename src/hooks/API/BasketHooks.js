import { useQuery } from "react-query";

export function useBasketGroceres() {
  return useQuery("basketGroceres", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/basketGroceries`).then((res) =>
      res.json()
    )
  );
}

export function useBasketProducts() {
  return useQuery("basketProducts", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/basketProducts`).then((res) =>
      res.json()
    )
  );
}

export function useBasketDishes() {
  return useQuery("basketDishes", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/basketDishes`).then((res) =>
      res.json()
    )
  );
}

export function useBasketSavedLists() {
  return useQuery("basketSavedLists", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/basketSavedLists`).then((res) =>
      res.json()
    )
  );
}

export const addBasketGroceries = async ({ data }) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCAL_HTTP}/basketGroceries`,
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

export const addBasketProducts = async ({ data }) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCAL_HTTP}/basketProducts`,
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

export const addBasketDishes = async ({ data }) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCAL_HTTP}/basketDishes`,
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

export const addBasketSavedLists = async ({ data }) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCAL_HTTP}/basketSavedLists`,
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
