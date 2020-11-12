import { config } from '../config'

import { getPUTparams } from './helpers'

export const settings = {
  getSettings: async () => {
    const res = await fetch(`${config.url}/settings`)
    return await res.json()
  },
  putSettings: async ({ data }) => {
    const response = await fetch(`${config.url}/settings`, getPUTparams(data))

    return await response.json()
  },
}
