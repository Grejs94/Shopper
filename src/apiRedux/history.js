import { config } from '../config'

import { getPOSTparams, getDELETEparams } from './helpers'

export const history = {
  getHistory: async () => {
    const res = await fetch(`${config.url}/history`)
    return await res.json()
  },
  postHistory: async ({ data }) => {
    const response = await fetch(`${config.url}/history`, getPOSTparams(data))

    return await response.json()
  },
  deleteHistory: async ({ id }) => {
    const response = await fetch(
      `${config.url}/history/${id}`,
      getDELETEparams(),
    )
    return await response.json()
  },
}
