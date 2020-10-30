import { config } from '../config'

export const parentCategories = {
  getParentCategories: async () => {
    const res = await fetch(`${config.url}/parentCategories`)
    return await res.json()
  },
}
