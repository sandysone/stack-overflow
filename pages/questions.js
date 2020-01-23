import { useGlobal } from 'reactn'
import ListGroup from 'react-bootstrap/ListGroup'
import Router from 'next/router'
import Link from 'next/link'

import { graphQLClient } from './api/_client'
import { NavigationBar } from '../components/Navbar'

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
  const [user] = useGlobal()
  console.log(user.username)

  if (typeof window !== 'undefined' && !user.username) {
    Router.push('/')
  }

  return (
    <>
      <NavigationBar username={user.username} />

      <ListGroup>
        {questions.map(mapQuestions)}
      </ListGroup>
    </>
  )
}

Questions.getInitialProps = async () => {
  const queryQuestions = `
    query questions {
      questions(orderBy: updatedAt_DESC) {
        id
        title
      }
    }`

  const { questions } = await graphQLClient.request(queryQuestions)

  return { questions }
}

export default Questions