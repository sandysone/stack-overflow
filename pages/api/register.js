import bcrypt from 'bcryptjs'

import { graphQLClient } from './_client'

const register = async (request, response) => {
  const { username, password, lat, lon, selfie64 } = request.body
  const hashedPassword = await bcrypt.hash(password, 10)

  const createUserQuery = `
  mutation register($username: String!, $password: String!, $lat: Float, $lon: Float, $selfie64: String) {
    createAppUser(data: {username: $username, password: $password, location: { latitude: $lat, longitude: $lon }, selfie64: $selfie64 }) {
      id
      username
      role
    }
  }`

  const { createAppUser } = await graphQLClient.request(createUserQuery, { username, password: hashedPassword, lat, lon, selfie64 })

  response.status(200).json({ data: { id: createAppUser.id, username: createAppUser.username, valid: true, role: createAppUser.role, selfie64: createAppUser.selfie64 } })
}

export default register