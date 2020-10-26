import { config } from '../config'

export const getSavedLists = async () => {
  const res = await fetch(`${config.url}/savedLists`)
  return await res.json()
}

export const getSavedListsCategories = async () => {
  const res = await fetch(`${config.url}/savedListsCategories`)
  return await res.json()
}

export const getBasket = async () => {
  const res = await fetch(`${config.url}/basketSavedLists`)
  return await res.json()
}

export const postBasketSavedLists = async ({ data }) => {
  const response = await fetch(`${config.url}/basketSavedLists`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}

export const putBasketSavedLists = async ({ data, id }) => {
  const response = await fetch(`${config.url}/basketSavedLists/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}

export const deleteBasketSavedLists = async ({ id }) => {
  const response = await fetch(`${config.url}/basketSavedLists/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  })

  return await response.json()
}
