import { config } from '../config'

import { getPOSTparams, getPUTparams, getDELETEparams } from './helpers'

const urlBasket = 'basketProducts'

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
    const res = await fetch(`${config.url}/${urlBasket}`)
    return await res.json()
  },
  postBasketProducts: async ({ data }) => {
    const response = await fetch(
      `${config.url}/${urlBasket}`,
      getPOSTparams(data),
    )

    return await response.json()
  },
  putBasketProducts: async ({ data, id }) => {
    const response = await fetch(
      `${config.url}/${urlBasket}/${id}`,
      getPUTparams(data),
    )

    return await response.json()
  },
  deleteBasketProducts: async ({ id }) => {
    const response = await fetch(
      `${config.url}/${urlBasket}/${id}`,
      getDELETEparams(),
    )

    return await response.json()
  },
}
