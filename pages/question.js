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


const query = `
{
  Movie(title: "Inception") {
    title
    releaseDate
    actors {
      name
    }
  }
}`

const Question = (props) => {
  // console.log(window.location.origin)
  // console.log(Router)
  const { data, error } = useSWR(query, fetcherGraphQL)

  if (error) return <Error description="Could not fetch" />
  if (!data) return <Loading />

  return (
    <>
      <Head>
        <link rel="manifest" href={"~/manifest.json"} />
        <link rel="shortcut icon" href={"~/favicon.png"} />
      </Head>

      <pre>{JSON.stringify(props, null, 2)}</pre>

      <Form>
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
  const { query } = context

  // const res = await fetch('https://api.github.com/repos/zeit/next.js')
  // const json = await res.json()
  // return { stars: json.stargazers_count }

  return { query }
}

export default Question