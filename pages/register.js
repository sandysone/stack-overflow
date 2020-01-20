import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import Router from 'next/router'

import { nativeFetcher } from '../lib/fetcher'

const handleSubmit = async (event) => {
  event.preventDefault()

  const { username, password } = event.target

  const content = await nativeFetcher('/register', 'POST', { username: username.value, password: password.value })

  console.log(content)

  Router.push('/questions')
}

export default () => (
  <>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="photo">
        <Form.Label>Selfie</Form.Label>
        <Form.Control type="file" capture="camera" accept="image/*" />
      </Form.Group>

      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control autoComplete="username" />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" autoComplete="current-password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        {'Register'}
      </Button>
    </Form>

    <br />

    <Link href="/">
      <a>Back to Login Page</a>
    </Link>
  </>
)