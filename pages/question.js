import { useState } from 'react'
import { useGlobal } from 'reactn'
import ListGroup from 'react-bootstrap/ListGroup'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'
import useSWR from 'swr'

import { graphQLClient } from './api/_client'
import { fetcherGraphQL } from '../lib/fetcher'
import { Loading } from '../components/Loading'
import { Error } from '../components/Error'

const createAnswerQuery = `
mutation answer($answer: String!, $userId: ID!) {
  updateAppUser(data: {answers: {create: {answer: $answer}}}, where: {id: $userId}) {
    id
  }
}
`

const updateAnswerQuery = `
mutation answer($answerId: ID!, $userId: ID!, $answer: String!) {
  updateAppUser(data: {
    answers: {
      update: {
        data: {answer: $answer}
        where: {
          id: $answerId
        }
      }
    }
  }, 
    where: {id: $userId
    }) {
    id
  }
}
`

const Question = ({ question }) => {
  const [user] = useGlobal()
  const [showEditQuestion, setShowEditQuestion] = useState(false)
  const [showDeleteQuestion, setShowDeleteQuestion] = useState(false)

  const handleToggleEditQuestion = () => setShowEditQuestion(!showEditQuestion)
  const handleToggleDeleteQuestion = () => setShowDeleteQuestion(!showDeleteQuestion)

  if (typeof window !== 'undefined' && !user.username) {
    Router.push('/')
  }

  const handleSubmit = (id) => (event) => {
    event.preventDefault()

    const { answer } = event.target

    console.log(answer.value, id)
  }

  const handleEditQuestion = () => { }
  const handleDeleteQuestion = () => { }

  return (
    <>
      <h3>{question?.title}</h3>
      <p>{question?.description}</p>

      {
        question?.appUser?.id === user.id || user.role === 'ADMIN'
          ? (
            <>
              <Button variant="outline-secondary" onClick={handleToggleEditQuestion}>
                {'Edit Question'}
              </Button>
              <Button variant="outline-danger">
                {'Delete Question'}
              </Button>
            </>
          )
          : null
      }

      <Modal show={showEditQuestion} onHide={handleToggleEditQuestion}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleToggleEditQuestion}>
            Close
          </Button>
          <Button variant="primary" onClick={handleToggleEditQuestion}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <br />
      <br />

      <Form onSubmit={handleSubmit(user.id)}>
        <Form.Group controlId="answer">
          <Form.Label>Answer</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>

        <Button variant="primary" type="submit">
          {'Post Answer'}
        </Button>
      </Form>
    </>
  )
}

Question.getInitialProps = async ({ query }) => {
  const queryQuestion = `
  query question($id: ID!) {
    question(where: {id: $id}) {
      title
      description
      appUser {
        id
      }
    }
  }`

  console.log(query)

  const { question } = await graphQLClient.request(queryQuestion, { id: query.id })
  console.log(question)

  return { question }
}

export default Question