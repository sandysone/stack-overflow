import ListGroup from 'react-bootstrap/ListGroup'
import Link from 'next/link'

import { NavigationBar } from '../components/Navbar'
import { graphQLClient } from './api/client'

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

const Questions = ({ questions }) => {
  return (
    <>
      <NavigationBar />

      <ListGroup>
        {questions.map(mapQuestions)}
      </ListGroup>
    </>
  )
}

Questions.getInitialProps = async () => {
  const { questions } = await graphQLClient.request(queryQuestions)

  return { questions }
}

export default Questions