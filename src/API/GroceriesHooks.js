import { useQuery } from 'react-query'

export function useGroceres() {
  return useQuery('groceres', () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/groceres`).then((res) =>
      res.json(),
    ),
  )
}

export function useGroceriesCategories() {
  return useQuery('groceriesCategories', () =>
    fetch(
      `${process.env.REACT_APP_LOCAL_HTTP}/groceriesCategories`,
    ).then((res) => res.json()),
  )
}
