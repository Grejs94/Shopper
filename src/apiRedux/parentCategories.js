import { config } from '../config'

export const getParentCategories = async () => {
  const res = await fetch(`${config.url}/parentCategories`)
  return await res.json()
}
