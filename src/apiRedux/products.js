import { config } from '../config'

export const getProducts = async () => {
  const res = await fetch(`${config.url}/products`)
  return await res.json()
}

export const getProductsCategories = async () => {
  const res = await fetch(`${config.url}/productsCategories`)
  return await res.json()
}

export const getBasketProducts = async () => {
  const res = await fetch(`${config.url}/basketProducts`)
  return await res.json()
}
