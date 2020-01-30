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
  const [userG, setUserG] = useState({})

  useEffect(() => {
    const cookieJS = parseCookie(document.cookie)
    const cookieEntries = Object.entries(cookieJS)
    const filteredEntries = cookieEntries.filter((v) => v[0].includes('selfie64'))
    const sortedEntries = filteredEntries.sort((a, b) => a[0] - b[0])
    const mappedEntries = sortedEntries.map(e => e[1])
    const joinedEntries = mappedEntries.join('')
    const addBase64 = joinedEntries.replace('base64', ';base64')
    const addEqual = addBase64 + '='

    cookieJS.selfie64 = addEqual
    setUserG(cookieJS)
  }, [])

  return (
    <>
      <NavigationBar username={userG.username} img={userG.selfie64} />

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