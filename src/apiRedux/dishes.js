import { config } from '../config'

import { getPOSTparams, getPUTparams, getDELETEparams } from 'assets'

export const dishes = {
  getDishes: async () => {
    const res = await fetch(`${config.url}/dishes`)
    return await res.json()
  },
  getDishesCategories: async () => {
    const res = await fetch(`${config.url}/dishesCategories`)
    return await res.json()
  },
  getBasket: async () => {
    const res = await fetch(`${config.url}/basketDishes`)
    return await res.json()
  },
  postBasketDishes: async ({ data }) => {
    const response = await fetch(
      `${config.url}/basketDishes`,
      getPOSTparams(data),
    )

    return await response.json()
  },
  putBasketDishes: async ({ data, id }) => {
    const response = await fetch(
      `${config.url}/basketDishes/${id}`,
      getPUTparams(data),
    )

    return await response.json()
  },
  deleteBasketDishes: async ({ id }) => {
    const response = await fetch(
      `${config.url}/basketDishes/${id}`,
      getDELETEparams(),
    )

    return await response.json()
  },
}
