import { config } from '../config'

import { getPOSTparams, getPUTparams, getDELETEparams } from 'assets'

export const groceries = {
  getGroceries: async () => {
    const res = await fetch(`${config.url}/groceres`)
    return await res.json()
  },
  getGroceriesCategories: async () => {
    const res = await fetch(`${config.url}/groceriesCategories`)
    return await res.json()
  },
  getBasketGroceries: async () => {
    const res = await fetch(`${config.url}/basketGroceries`)
    return await res.json()
  },
  postBasketGroceries: async ({ data }) => {
    const response = await fetch(
      `${config.url}/basketGroceries`,
      getPOSTparams(data),
    )

    return await response.json()
  },
  putBasketGroceries: async ({ data, id }) => {
    const response = await fetch(
      `${config.url}/basketGroceries/${id}`,
      getPUTparams(data),
    )

    return await response.json()
  },
  deleteBasketGroceries: async ({ id }) => {
    const response = await fetch(
      `${config.url}/basketGroceries/${id}`,
      getDELETEparams(),
    )
    return await response.json()
  },
}
