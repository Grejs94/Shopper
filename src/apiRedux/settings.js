import { config } from '../config'

export const getSettings = async () => {
  const res = await fetch(`${config.url}/settings`)
  return await res.json()
}

export const putSettings = async ({ data }) => {
  const response = await fetch(`${config.url}/settings`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}
