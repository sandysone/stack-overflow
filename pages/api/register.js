import bcrypt from 'bcryptjs'
import { graphQLClient } from './client'

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

  res.status(200).json({ data: response.createUser })
}

export default createUser