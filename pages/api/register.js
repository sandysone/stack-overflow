import bcrypt from 'bcryptjs'

import { graphQLClient } from './_client'

const register = async (request, response) => {
  const { username, password } = request.body
  const hashedPassword = await bcrypt.hash(password, 10)

  const createUserQuery = `
  mutation register($username: String!, $password: String!) {
    createAppUser(data: {username: $username, password: $password}) {
      id
      username
    }
  }`

  const { createAppUser } = await graphQLClient.request(createUserQuery, { username, password: hashedPassword })

  response.status(200).json({ data: { id: createAppUser.id, username: createAppUser.username, valid: true } })
}

export default register