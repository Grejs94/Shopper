import { config } from '../config'

import { getPOSTparams, getPUTparams, getDELETEparams } from 'assets'

export const products = {
  getProducts: async () => {
    const res = await fetch(`${config.url}/products`)
    return await res.json()
  },
  getProductsCategories: async () => {
    const res = await fetch(`${config.url}/productsCategories`)
    return await res.json()
  },
  getBasketProducts: async () => {
    const res = await fetch(`${config.url}/basketProducts`)
    return await res.json()
  },
  postBasketProducts: async ({ data }) => {
    const response = await fetch(
      `${config.url}/basketProducts`,
      getPOSTparams(data),
    )

    return await response.json()
  },
  putBasketProducts: async ({ data, id }) => {
    const response = await fetch(
      `${config.url}/basketProducts/${id}`,
      getPUTparams(data),
    )

    return await response.json()
  },
  deleteBasketProducts: async ({ id }) => {
    const response = await fetch(
      `${config.url}/basketProducts/${id}`,
      getDELETEparams(),
    )

    return await response.json()
  },
}
