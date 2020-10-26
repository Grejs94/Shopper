import { config } from '../config'

export const getGroceries = async () => {
  const res = await fetch(`${config.url}/groceres`)
  return await res.json()
}

export const getGroceriesCategories = async () => {
  const res = await fetch(`${config.url}/groceriesCategories`)
  return await res.json()
}

export const getBasketGroceries = async () => {
  const res = await fetch(`${config.url}/basketGroceries`)
  return await res.json()
}

export const postBasketGroceries = async ({ data }) => {
  const response = await fetch(`${config.url}/basketGroceries`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}

export const putBasketGroceries = async ({ data, id }) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCAL_HTTP}/basketGroceries/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  )

  return await response.json()
}

export const deleteBasketGroceries = async ({ id }) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCAL_HTTP}/basketGroceries/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  )
  return await response.json()
}
