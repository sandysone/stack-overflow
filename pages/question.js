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

const Question = ({ question, userId: questionUserId, questionUsername, answers }) => {
  const [globalUser] = useGlobal()
  const [isLoading, setIsLoading] = useState(false)
  const [showEditQuestion, setShowEditQuestion] = useState(false)
  const [showDeleteQuestion, setShowDeleteQuestion] = useState(false)
  const [showEditAnswer, setShowEditAnswer] = useState(false)
  const [showDeleteAnswer, setShowDeleteAnswer] = useState(false)

  const [editAnswerId, setEditAnswerId] = useState('')
  const [answerString, setAnswerString] = useState('')

  const [stateQuestion, setStateQuestion] = useState(question)

  const handleToggleEditQuestion = () => setShowEditQuestion(!showEditQuestion)
  const handleToggleDeleteQuestion = () => setShowDeleteQuestion(!showDeleteQuestion)
  const handleToggleEditAnswer = () => setShowEditAnswer(!showEditAnswer)
  const handleToggleDeleteAnswer = () => setShowDeleteAnswer(!showDeleteAnswer)

  if (typeof window !== 'undefined' && !globalUser.username) {
    Router.push('/')
  }

  // Only one answer logic
  const userAnswers = answers.filter(a => a.appUser.id === globalUser.id)
  const hasAnswer = userAnswers.length > 0

  const handleSubmit = (id) => async (event) => {
    event.preventDefault()
    setIsLoading(true)

    const { answer } = event.target

    const createAnswerQuery = `
     mutation answer($answer: String!, $userId: ID!, $questionId: ID!) {
  updateAppUser(data: {answers: {create: {answer: $answer, question: {connect: {id: $questionId}}}}}, where: {id: $userId}) {
    answers(orderBy: createdAt_DESC, first: 1) {
      id
      answer
    }
  }
}`

    const { updateAppUser } = await graphQLClient.request(
      createAnswerQuery,
      { answer: answer.value, userId: id, questionId: stateQuestion?.id }
    )

    setIsLoading(false)
  }

  const handleEditAnswer = (answerId) => async (event) => {
    event.preventDefault()
    setIsLoading(true)

    const { answer } = event.target

    const editAnswerQuery = `
    mutation editAnswer($id: ID!, $answer: String!) {
      updateAnswer(where: {id: $id}, data: {answer: $answer}) {
        id
        answer
      }
    }`

    const { updateAnswer } = await graphQLClient.request(
      editAnswerQuery,
      { answer: answer.value, id: answerId }
    )

    setStateQuestion(updateAnswer)
    setIsLoading(false)
    handleToggleEditAnswer()
  }

  const handleDeleteAnswer = (answerId) => async () => {
    setIsLoading(true)

    const deleteAnswerQuery = `
    mutation deleteAnswer($id: ID!) {
      deleteAnswer(where: {id: $id}) {
        id
      }
    }`

    const { deleteAnswer } = await graphQLClient.request(
      deleteAnswerQuery,
      { id: answerId }
    )

    console.log(deleteAnswer)

    setIsLoading(false)
    handleToggleDeleteAnswer()
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

  const handleDeleteQuestion = (id) => async () => {
    setIsLoading(true)

    const deleteQuestionQuery = `
    mutation deleteQuestion($id: ID!) {
      deleteQuestion(where: {id: $id}) {
        id
      }
    }`

    const { deleteQuestion } = await graphQLClient.request(
      deleteQuestionQuery,
      { id }
    )

    console.log(deleteQuestion)

    setIsLoading(false)
    Router.push('/questions')
  }

  return (
    <>
      <a href="#" onClick={() => Router.push('/questions')}>&larr; Home</a>
      <br />
      <h3>{stateQuestion?.title}</h3>
      <p>{stateQuestion?.description}</p>
      <small>Asked by {questionUsername}</small>

      <br />
      <br />

      {
        questionUserId === globalUser.id || globalUser.role === 'ADMIN'
          ? (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <a href="#" style={{ textDecoration: 'underline' }} onClick={handleToggleEditQuestion}>
                {'Edit Question'}
              </a>
              <a href="#" style={{ color: 'red', textDecoration: 'underline' }} onClick={handleToggleDeleteQuestion}>
                {'Delete Question'}
              </a>
            </div>
          )
          : null
      }

      {/* Question */}
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

            <Button variant="outline-secondary" onClick={handleToggleEditQuestion}>
              {'Cancel'}
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner animation="border" size="sm" /> : 'Save Changes'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteQuestion} onHide={handleToggleDeleteQuestion}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this question?</p>
          <Button variant="outline-secondary" onClick={handleToggleDeleteQuestion}>
            {'Cancel'}
          </Button>
          <Button variant="danger" disabled={isLoading} onClick={handleDeleteQuestion(stateQuestion?.id)}>
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Delete'}
          </Button>
        </Modal.Body>
      </Modal>

      {/* Answer */}
      <Modal show={showEditAnswer} onHide={handleToggleEditAnswer}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Answer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditAnswer(editAnswerId)}>
            <Form.Group controlId="answer">
              <Form.Label>Answer</Form.Label>
              <Form.Control as="textarea" rows="3" defaultValue={answerString} />
            </Form.Group>

            <Button variant="outline-secondary" onClick={handleToggleEditAnswer}>
              {'Cancel'}
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner animation="border" size="sm" /> : 'Save Changes'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteAnswer} onHide={handleToggleDeleteAnswer}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Answer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this answer?</p>
          <Button variant="outline-secondary" onClick={handleToggleDeleteAnswer}>
            {'Cancel'}
          </Button>
          <Button variant="danger" disabled={isLoading} onClick={handleDeleteAnswer(editAnswerId)}>
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Delete'}
          </Button>
        </Modal.Body>
      </Modal>

      <br />

      <h4>{answers.length} answers</h4>

      {answers.map(a => {
        return (
          <div key={a.id} style={{ backgroundColor: '#eee', borderRadius: '5px', padding: '7px 9px' }}>
            <p>{a.answer}</p>
            <small>
              {'Answered by '}{a.appUser.username}
              <br />
              {
                globalUser.id === a.appUser.id || globalUser.role === 'ADMIN'
                  ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <a href="#" style={{ textDecoration: 'underline' }} onClick={() => {
                        setEditAnswerId(a.id)
                        setAnswerString(a.answer)
                        handleToggleEditAnswer()
                      }}>Edit answer</a>
                      <a href="#" style={{ color: 'red', textDecoration: 'underline' }} onClick={() => {
                        setEditAnswerId(a.id)
                        handleToggleDeleteAnswer()
                      }}>Delete answer</a>
                    </div>
                  )
                  : null
              }
            </small>
          </div>
        )
      })}

      <br />

      {
        hasAnswer
          ? null
          : (
            <Form onSubmit={handleSubmit(globalUser.id)}>
              <Form.Group controlId="answer">
                <Form.Label>Your Answer</Form.Label>
                <Form.Control as="textarea" rows="3" />
              </Form.Group>

              <Button variant="primary" type="submit">
                {isLoading ? <Spinner animation="border" size="sm" /> : 'Post Answer'}
              </Button>
            </Form>
          )
      }
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
      answers(orderBy: createdAt_ASC) {
        id
        answer
        appUser {
          id
          username
        }
      }
      appUser {
        id
        username
      }
    }
  }`

  const { question } = await graphQLClient.request(queryQuestion, { id: query.id })

  return {
    question,
    userId: question.appUser.id,
    questionUsername: question.appUser.username,
    answers: question.answers
  }
}

export default Question