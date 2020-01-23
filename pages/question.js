import { useState } from 'react'
import { useGlobal } from 'reactn'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
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

const Question = ({ question, userId: questionUserId }) => {
  console.log({ questionUserId })
  const [globalUser] = useGlobal()
  const [isLoading, setIsLoading] = useState(false)
  const [showEditQuestion, setShowEditQuestion] = useState(false)
  const [showDeleteQuestion, setShowDeleteQuestion] = useState(false)

  const [stateQuestion, setStateQuestion] = useState(question)

  const handleToggleEditQuestion = () => setShowEditQuestion(!showEditQuestion)
  const handleToggleDeleteQuestion = () => setShowDeleteQuestion(!showDeleteQuestion)

  if (typeof window !== 'undefined' && !globalUser.username) {
    Router.push('/')
  }

  const handleSubmit = (id) => (event) => {
    event.preventDefault()
    setIsLoading(true)

    const { answer } = event.target

    console.log(answer.value, id)
    setIsLoading(false)
  }

  const handleSubmitEditQuestion = (questionId) => async (event) => {
    event.preventDefault()
    setIsLoading(true)

    const { title, description } = event.target

    const editQuestionQuery = `
    mutation editQuestion($id: ID!, $title: String!, $description: String!) {
      updateQuestion(where: {id: $id}, data: {title:$title, description:$description}) {
        id
        title
        description
      }
    }`

    const { updateQuestion } = await graphQLClient.request(
      editQuestionQuery,
      { title: title.value, description: description.value, id: questionId }
    )

    setStateQuestion(updateQuestion)
    setIsLoading(false)
    handleToggleEditQuestion()
  }

  const handleDeleteQuestion = () => {
    const deleteQuestionQuery = `
    mutation deleteQuestion($id: ID!) {
      deleteQuestion(where: {id: $id}) {
        id
      }
    }
    `
  }

  return (
    <>
      <h3>{stateQuestion?.title}</h3>
      <p>{stateQuestion?.description}</p>

      {
        questionUserId === globalUser.id || globalUser.role === 'ADMIN'
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
          <Modal.Title>Edit Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitEditQuestion(stateQuestion?.id)}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control defaultValue={stateQuestion?.title} />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows="3" defaultValue={stateQuestion?.description} />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner animation="border" size="sm" /> : 'Save Changes'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <br />
      <br />

      <Form onSubmit={handleSubmit(globalUser.id)}>
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
      id
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

  return { question, userId: question.appUser.id }
}

export default Question