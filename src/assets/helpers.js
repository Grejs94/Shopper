// API

export const getPOSTparams = (data) => {
  return {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }
}

export const getPUTparams = (data) => {
  return {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }
}

export const getDELETEparams = () => {
  return {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  }
}
