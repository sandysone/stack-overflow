import { useGlobal } from 'reactn'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'
import useSWR from 'swr'

import { fetcherGraphQL } from '../lib/fetcher'
import { Loading } from '../components/Loading'
import { Error } from '../components/Error'


const createQuestion = `
mutation ask($title: String!, $description: String!, $userId: ID!) {
  updateAppUser(data: {questions: {create: {title: $title, description: $description}}}, where: {id: $userId}) {
    id
  }
}
`

const handleSubmit = (id) => (event) => {
  event.preventDefault()

  const { title, description } = event.target

  console.log(title.value, description.value, id)
}

const Ask = () => {
  const [user] = useGlobal()
  console.log(user.username)

  if (typeof window !== 'undefined' && !user.username) {
    Router.push('/')
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

        <Button variant="primary" type="submit">
          {'Post Question'}
        </Button>
      </Form>
    </>
  )
}

export default Ask