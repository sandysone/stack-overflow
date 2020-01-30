export const parseCookie = (cookieStr) => {
  return cookieStr.split(';').reduce((acc, curr) => {
    const [key, value] = curr.trim().split('=')
    acc[key] = value
    return acc
  }, {})
}

export const chunks = (array, len) => {
  const chunks = []
  const n = array.length

  let i = 0

  while (i < n) {
    chunks.push(array.slice(i, (i += len)))
  }

  return chunks
}