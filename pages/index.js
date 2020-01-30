import { useGlobal } from 'reactn'
import { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Link from 'next/link'

import { graphQLClient } from './api/_client'
import { parseCookie } from '../lib/cookie'
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
  const [userG, setUserG] = useState({})

  useEffect(() => {
    const cookieJS = parseCookie(document.cookie)
    setUserG(cookieJS)
  }, [])

  return (
    <>
      <NavigationBar username={userG.username} img={user.selfie64} />

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