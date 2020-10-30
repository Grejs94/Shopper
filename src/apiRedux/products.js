import { config } from '../config'

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
    const response = await fetch(`${config.url}/basketProducts`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    return await response.json()
  },
  putBasketProducts: async ({ data, id }) => {
    const response = await fetch(`${config.url}/basketProducts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    return await response.json()
  },
  deleteBasketProducts: async ({ id }) => {
    const response = await fetch(`${config.url}/basketProducts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    })

    return await response.json()
  },
}
