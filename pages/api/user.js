import bcrypt from 'bcryptjs'
import { GraphQLClient } from 'graphql-request'

const endpoint = 'https://api-useast.graphcms.com/v1/ck5l56cu7411x01flhyuzgeog/master'
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjoyLCJ0b2tlbklkIjoiYjljZTM0OGUtMWQwMC00M2IyLTgyYWYtNGRhZmMxZWI2OTYzIiwiaWF0IjoxNTc5NTQ4Mjc0LCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyJ9.Z1tlOqWVGagjQg-lJ96w5gV-iO9whMeFVNffuY56CnPbkyMNHXzQ8Bj2I0A6Ngn94TVIo6TCU7JaMQyjbAhZTz6BWocNrblBrsqNdC3Vb7i46u97Z4ccTDwrHxReZD5WDhrdkMM_kRbqbecxPhvcPuz0xUFYIW-DnqtJQ7l2I8sg1_BkrF6SJIha66oyEK12VYASg5WFXiCnLkUdqowhyjmJrqgKR2GplFdPL2-f_2-42ugDTt3w1Ll1ZckbjaAZ-PmRxW_gEwOLJy5Ahs5TrTmCADprZDeocKsZpfbGsAy00P4SgYj9Qtcq9DImsAnJLFB3NaqlLnNdu3xywQqZvUVFwhwN2XF47fcAzBPjqXbh7JXv_Aqyj0Csf49vWuk1DO3IK4l0xFw0qS4f_vMR1SHFTVSwsmC2naw1xhQ1_4fgw1bqjoJCSKOPh2qjtDLPDPq26Gi6enK1sgnsob1C0m9n8kqQNuK0T1haCPpEY_qTLUbIxwqqNhIRwGsowsslXt8KQ6Wr6oCF4Kdw62YejcHiOug4zut7-saOjDDLMH42O81SN-5JgOd7I4wd4pe0wg1qZj5K4AZH6cmt5MDu7LgCl8QKy-rRBbDXUUQrTpj_KKZSo-n60siyviIYoBujkYxo__ivM4ls4dCrodlUQ2AQV99ZNt5EBaVE1d4TD7A'

const graphQLClient = new GraphQLClient(endpoint, {
  headers: { authorization: 'Bearer ' + token },
})

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