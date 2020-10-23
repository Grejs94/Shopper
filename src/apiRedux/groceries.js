import { config } from '../config'

export const getGroceries = async () => {
  const res = await fetch(`${config.url}/groceres`)
  return await res.json()
}

export const getGroceriesCategories = async () => {
  const res = await fetch(`${config.url}/groceriesCategories`)
  return await res.json()
}
