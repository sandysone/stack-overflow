import ListGroup from 'react-bootstrap/ListGroup'
import Link from 'next/link'

import { NavigationBar } from '../components/Navbar'
import { graphQLClient } from './api/_client'

const queryQuestions = `
query questions {
  questions {
    id
    title
  }
}`

const mapQuestions = (question) => {
  const { id, title } = question

  return (
    <ListGroup.Item key={id}>
      <Link href={`/question?id=${id}`}>
        <a>{title}</a>
      </Link>
    </ListGroup.Item>
  )
}

const Questions = ({ questions, username }) => {
  return (
    <>
      <NavigationBar username={username} />

      <ListGroup>
        {questions.map(mapQuestions)}
      </ListGroup>
    </>
  )
}

Questions.getInitialProps = async (context) => {
  const username = context?.req?.headers?.cookie
    ?.split(';')
    ?.find(pair => pair.includes('username'))
    ?.split('=')[1]
    ?.trim()

  const { questions } = await graphQLClient.request(queryQuestions)

  return { questions, username }
}

export default Questions