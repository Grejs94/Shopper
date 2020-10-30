import { config } from '../config'

export const settings = {
  getSettings: async () => {
    const res = await fetch(`${config.url}/settings`)
    return await res.json()
  },
  putSettings: async ({ data }) => {
    const response = await fetch(`${config.url}/settings`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    return await response.json()
  },
}
