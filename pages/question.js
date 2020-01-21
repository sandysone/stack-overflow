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

const handleSubmit = (id) => () => {
  event.preventDefault()

  const { answer } = event.target

  console.log(answer.value, id)
}

const Question = ({ id, redirect }) => {
  if (redirect && typeof window !== 'undefined') {
    Router.push('/')
  }

  // const { data, error } = useSWR(anserQuery, fetcherGraphQL)

  // if (error) return <Error description="Could not fetch" />
  // if (!data) return <Loading />

  return (
    <>
      <Form onSubmit={handleSubmit(id)}>
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

Question.getInitialProps = async (context) => {
  const isLogged = context?.req?.headers?.cookie

  const id = context?.req?.headers?.cookie
    ?.split(';')
    ?.find(pair => pair.includes('id'))
    ?.split('=')[1]
    ?.trim()

  return { id, redirect: !isLogged }
}

export default Question