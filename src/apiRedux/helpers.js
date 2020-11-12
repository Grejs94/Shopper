// API

export const getPOSTparams = (data) => ({
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify(data),
})

export const getPUTparams = (data) => ({
  method: 'PUT',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify(data),
})

export const getDELETEparams = () => ({
  method: 'DELETE',
  headers: {
    'Content-type': 'application/json',
  },
})
