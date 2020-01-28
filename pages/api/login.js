import bcrypt from 'bcryptjs'

import { graphQLClient } from './_client'

const login = async (request, response) => {
  const { username, password } = request.body

  const loginQuery = `
  query login($username: String!) {
    appUser(where: {username: $username}) {
      id
      username
      password
      role
      selfie64
    }
  }`

  const { appUser } = await graphQLClient.request(loginQuery, { username })

  const valid = await bcrypt.compare(password, String(appUser?.password))

  response.status(200).json({ data: { valid, id: appUser?.id, username: appUser?.username, role: appUser?.role, selfie64: appUser?.selfie64 } })
}

export default login