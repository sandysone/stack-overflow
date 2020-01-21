import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Link from 'next/link'
import Router from 'next/router'
import { useState } from 'react'

import { nativeFetcher } from '../lib/fetcher'

const Index = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    const { username, password } = event.target

    const content = await nativeFetcher('/login', 'POST', { username: username.value, password: password.value })

    console.log(content)

    if (content.data) {
      Router.push('/questions')
    }

    setIsLoading(false)
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control autoComplete="username" />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" autoComplete="current-password" />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? <Spinner animation="border" size="sm" /> : 'Login'}
        </Button>
      </Form>

      <br />

      <Link href="/register">
        <a>Create Account</a>
      </Link>
    </>
  )
}

export default Index