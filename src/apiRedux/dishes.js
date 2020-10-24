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
