import { config } from '../config'

export const getHistory = async () => {
  const res = await fetch(`${config.url}/history`)
  return await res.json()
}

export const postHistory = async ({ data }) => {
  const response = await fetch(`${config.url}/history`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}

export const deleteHistory = async ({ id }) => {
  const response = await fetch(`${config.url}/history/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  return await response.json()
}
