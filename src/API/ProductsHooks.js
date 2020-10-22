import { useQuery } from "react-query";

export function useProducts() {
  return useQuery("products", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/products`).then((res) =>
      res.json()
    )
  );
}

export function useProductsCategories() {
  return useQuery("productsCategories", () =>
    fetch(
      `${process.env.REACT_APP_LOCAL_HTTP}/productsCategories`
    ).then((res) => res.json())
  );
}
