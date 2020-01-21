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
mutation ask($title: String!, $description: String!) {
  createQuestion(data: { title: $title, description: $description }) {
    id
  }
}`

const Question = (props) => {
  const { data, error } = useSWR(createQuestion, fetcherGraphQL)

  if (error) return <Error description="Could not fetch" />
  if (!data) return <Loading />

  return (
    <>
      <pre>{JSON.stringify(props, null, 2)}</pre>

      <Form>
        <Form.Group controlId="answer">
          <Form.Label>Answer</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>

        <Button variant="primary" type="submit">
          {'Post Question'}
        </Button>

      </Form>
    </>
  )
}

Question.getInitialProps = async (context) => {
  const { query } = context

  return { query }
}

export default Question