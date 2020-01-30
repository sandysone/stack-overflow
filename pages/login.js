import { useGlobal } from 'reactn'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Link from 'next/link'
import Router from 'next/router'
import { useState } from 'react'

import { nativeFetcher } from '../lib/fetcher'
import { chunks } from '../lib/cookie'

const Index = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [, setUser] = useGlobal()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    const { username, password } = event.target

    const content = await nativeFetcher('/login', 'POST', { username: username.value, password: password.value })

    if (content.data?.valid) {
      setUser({
        id: content.data.id,
        username: content.data.username,
        role: content.data.role,
        selfie64: content.data.selfie64
      })

      document.cookie = `id=${content.data.id}`
      document.cookie = `username=${content.data.username}`
      document.cookie = `role=${content.data.role}`

      const chunkedSelfie = chunks(content.data.selfie64.split(''), 1000)
      chunkedSelfie.forEach((c, i) => {
        const jointed = c.join('')
        const removedSemicolon = jointed.replace(';', '')
        const removedEqual = removedSemicolon.replace('=', '')
        document.cookie = `selfie64_${i}=${removedEqual}`
      })

      Router.push('/')
    }
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