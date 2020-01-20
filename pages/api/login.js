import bcrypt from 'bcryptjs'
import { graphQLClient } from './client'

const login = async (req, res) => {
  const { username, password } = req.body

  const loginUser = `
  query login($username: String!) {
    appUser(where: {username: $username}) {
      password
    }
  }`

  const response = await graphQLClient.request(loginUser, { username })

  const valid = await bcrypt.compare(password, response.appUser.password)

  res.status(200).json({ data: valid })
}

export default login