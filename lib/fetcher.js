import { request } from 'graphql-request'

const API = 'https://api.graph.cool/simple/v1/movies'

export const fetcherGraphQL = (query) => request(API, query)

export const fetcherREST = (api, data) => fetch(api, data)

export const nativeFetcher = async (path, method = 'GET', jsonBody) => {
  const rawResponse = await fetch('/api' + path, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonBody)
  })

  return rawResponse.json()
} 