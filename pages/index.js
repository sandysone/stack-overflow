import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import useSWR, { mutate } from 'swr'

import { fetcher } from '../lib/fetcher'

const createUser = `
mutation {
  createAppUser(data: {username: "test", password: "test"}) {
    id
  }
}`

const submit = (event) => {
  event.preventDefault()

  const { username, password } = event.target

  console.log(username.value)
  console.log(password.value)

  mutate('/api/user', { ...data, name: newName })
}

const Index = () => {
  // const { data, error } = useSWR(query, fetcher)

  // if (error) return <Error description="Could not fetch" />
  // if (!data) return <Loading />

  return (
    <>
      <Form onSubmit={submit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control autoComplete="username" />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" autoComplete="current-password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          {'Login'}
        </Button>
      </Form>

      <br />

      <Link href="/register">
        <a>Create Account</a>
      </Link>

      <style jsx global>{`
      body {
        margin: 0 auto;
        max-width: 30em;
        margin-top: 20px;
        padding: 0 15px;
      }
      `}
      </style>
    </>
  )
}

export default Index