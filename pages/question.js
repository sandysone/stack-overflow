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

const handleSubmit = (id) => (event) => {
  event.preventDefault()

  const { answer } = event.target

  console.log(answer.value, id)
}

const Question = () => {
  const [user] = useGlobal()
  console.log(user.username)

  if (typeof window !== 'undefined' && !user.username) {
    Router.push('/')
  }

  // const { data, error } = useSWR(anserQuery, fetcherGraphQL)

  // if (error) return <Error description="Could not fetch" />
  // if (!data) return <Loading />

  return (
    <>
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

Question.getInitialProps = async (context) => {
  return {}
}

export default Question