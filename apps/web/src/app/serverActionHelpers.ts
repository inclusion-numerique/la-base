export const serverAction403 = () => ({
  status: 403,
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    message: 'Forbidden',
  }),
})

export const serverAction400 = (error?: unknown) => ({
  status: 400,
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify(error ?? { message: 'Bad request' }),
})
