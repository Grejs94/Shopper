import { config } from '../config'

export const getSavedLists = async () => {
  const res = await fetch(`${config.url}/savedLists`)
  return await res.json()
}

export const getSavedListsCategories = async () => {
  const res = await fetch(`${config.url}/savedListsCategories`)
  return await res.json()
}
