import { config } from '../config'

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
    const response = await fetch(`${config.url}/basketDishes`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    return await response.json()
  },
  putBasketSavedLists: async ({ data, id }) => {
    const response = await fetch(`${config.url}/basketSavedLists/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    return await response.json()
  },
  deleteBasketSavedLists: async ({ id }) => {
    const response = await fetch(`${config.url}/basketSavedLists/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    })

    return await response.json()
  },
}
