import { config } from '../config'

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
    const response = await fetch(`${config.url}/basketDishes`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    return await response.json()
  },
  putBasketDishes: async ({ data, id }) => {
    const response = await fetch(`${config.url}/basketDishes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    return await response.json()
  },
  deleteBasketDishes: async ({ id }) => {
    const response = await fetch(`${config.url}/basketDishes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    })

    return await response.json()
  },
}
