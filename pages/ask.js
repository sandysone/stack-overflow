import { useState } from 'react'
import { useGlobal } from 'reactn'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Router from 'next/router'

import { graphQLClient } from './api/_client'

const createQuestion = `
mutation ask($title: String!, $description: String!, $userId: ID!) {
  updateAppUser(data: {questions: {create: {title: $title, description: $description}}}, where: {id: $userId}) {
    id
  }
}
`

const Ask = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [user] = useGlobal()
  console.log(user.username)

  if (typeof window !== 'undefined' && !user.username) {
    Router.push('/')
  }

  const handleSubmit = (id) => async (event) => {
    event.preventDefault()
    setIsLoading(true)

    const { title, description } = event.target

    console.log(title.value, description.value, id)

    const response = await graphQLClient.request(
      createQuestion,
      { title: title.value, description: description.value, userId: id }
    )

    setIsLoading(false)

    if (response?.updateAppUser) {
      Router.push('/question?id=' + response.updateAppUser.id)
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(user.id)}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? <Spinner animation="border" size="sm" /> : 'Post Question'}
        </Button>
      </Form>
    </>
  )
}

export default Ask