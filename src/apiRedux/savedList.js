import { config } from '../config'

import { getPOSTparams, getPUTparams, getDELETEparams } from 'assets'

export const savedList = {
  getSavedLists: async () => {
    const res = await fetch(`${config.url}/savedLists`)
    return await res.json()
  },
  getSavedListsCategories: async () => {
    const res = await fetch(`${config.url}/savedListsCategories`)
    return await res.json()
  },
  getBasket: async () => {
    const res = await fetch(`${config.url}/basketSavedLists`)
    return await res.json()
  },
  postBasketSavedLists: async ({ data }) => {
    const response = await fetch(
      `${config.url}/basketDishes`,
      getPOSTparams(data),
    )

    return await response.json()
  },
  putBasketSavedLists: async ({ data, id }) => {
    const response = await fetch(
      `${config.url}/basketSavedLists/${id}`,
      getPUTparams(data),
    )

    return await response.json()
  },
  deleteBasketSavedLists: async ({ id }) => {
    const response = await fetch(
      `${config.url}/basketSavedLists/${id}`,
      getDELETEparams(),
    )

    return await response.json()
  },
}
