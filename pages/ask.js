import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Router from 'next/router'

import { graphQLClient } from './api/_client'
import { parseCookie } from '../lib/cookie'

const Ask = () => {
  const [userG, setUserG] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const isNotLogged = !userG.id

  useEffect(() => {
    const cookieJS = parseCookie(document.cookie)
    setUserG(cookieJS)
  }, [])

  const handleSubmit = (id) => async (event) => {
    event.preventDefault()
    setIsLoading(true)

    const { title, description } = event.target

    const createQuestion = `
    mutation ask($title: String!, $description: String!, $userId: ID!) {
      updateAppUser(data: {questions: {create: {title: $title, description: $description}}}, where: {id: $userId}) {
        questions(orderBy: createdAt_DESC, first: 1) {
          id
        }
      }
    }`

    const response = await graphQLClient.request(
      createQuestion,
      { title: title.value, description: description.value, userId: id }
    )

    Router.push('/question?id=' + response.updateAppUser.questions[0].id)
  }

  return (
    <>
      <Form onSubmit={handleSubmit(userG.id)}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isNotLogged || isLoading}>
          {isNotLogged
            ? 'Must login to ask'
            : isLoading
              ? <Spinner animation="border" size="sm" />
              : 'Post Question'
          }
        </Button>
        <Button variant="outline-secondary" onClick={() => Router.push('/')}>
          {'Cancel'}
        </Button>
      </Form>
    </>
  )
}

export default Ask