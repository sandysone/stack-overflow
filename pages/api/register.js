import bcrypt from 'bcryptjs'

import { graphQLClient } from './_client'
import { cookieName, cookieOptions } from './_cookie'

// module.exports = (req, res) => {
//   res.json({
//     body: req.body,
//     query: req.query,
//     cookies: req.cookies
//   })
// }

const register = async (request, response) => {
  const { username, password } = request.body
  const hashedPassword = await bcrypt.hash(password, 10)

  const createUserQuery = `
  mutation register($username: String!, $password: String!) {
    createAppUser(data: {username: $username, password: $password}) {
      id
    }
  }`

  const { createAppUser } = await graphQLClient.request(createUserQuery, { username, password: hashedPassword })

  response.cookie(cookieName, createAppUser.id, cookieOptions)

  response.status(200).json({ data: createAppUser.id })
}

export default register