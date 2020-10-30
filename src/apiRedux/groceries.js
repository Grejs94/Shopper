import { config } from '../config'

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
    const response = await fetch(`${config.url}/basketGroceries`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    return await response.json()
  },
  putBasketGroceries: async ({ data, id }) => {
    const response = await fetch(`${config.url}/basketGroceries/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    return await response.json()
  },
  deleteBasketGroceries: async ({ id }) => {
    const response = await fetch(`${config.url}/basketGroceries/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    return await response.json()
  },
}
