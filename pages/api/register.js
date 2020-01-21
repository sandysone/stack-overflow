import bcrypt from 'bcryptjs'
import { graphQLClient } from './client'

const cookieName = 'token'

const createCookie = (userId, context) => {
  const args = [
    cookieName,
    userId,
    {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    },
  ]

  context.response.cookie(...args)
}

// context.response.clearCookie(cookieName)


const createUser = async (req, res) => {
  const { username, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)

  const createUser = `
  mutation createUser($username: String!, $password: String!) {
    createAppUser(data: {username: $username, password: $password}) {
      id
    }
  }`

  const response = await graphQLClient.request(createUser, { username, password: hashedPassword })

  // createCookie(user.id, context)

  res.status(200).json({ data: response.createAppUser })
}

export default createUser