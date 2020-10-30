import { config } from '../config'

export const history = {
  getHistory: async () => {
    const res = await fetch(`${config.url}/history`)
    return await res.json()
  },
  postHistory: async ({ data }) => {
    const response = await fetch(`${config.url}/history`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    return await response.json()
  },
  deleteHistory: async ({ id }) => {
    const response = await fetch(`${config.url}/history/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    return await response.json()
  },
}
