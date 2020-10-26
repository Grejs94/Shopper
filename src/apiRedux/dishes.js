import { config } from '../config'

export const getDishes = async () => {
  const res = await fetch(`${config.url}/dishes`)
  return await res.json()
}

export const getDishesCategories = async () => {
  const res = await fetch(`${config.url}/dishesCategories`)
  return await res.json()
}

export const getBasket = async () => {
  const res = await fetch(`${config.url}/basketDishes`)
  return await res.json()
}

export const postBasketDishes = async ({ data }) => {
  const response = await fetch(`${config.url}/basketDishes`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}

export const putBasketDishes = async ({ data, id }) => {
  const response = await fetch(`${config.url}/basketDishes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}

export const deleteBasketDishes = async ({ id }) => {
  const response = await fetch(`${config.url}/basketDishes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  })

  return await response.json()
}
