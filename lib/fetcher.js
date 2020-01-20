import { request } from 'graphql-request'

const API = 'https://api.graph.cool/simple/v1/movies'

export const fetcherGraphQL = (query) => request(API, query)

export const fetcherREST = (api, data) => fetch(api, data)