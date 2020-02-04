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
    const l = localStorage.getItem('size')
    const imageArray = [...Array(Number(l))].map((_, i) => i)

    const joinedEntries = imageArray.reduce((acc, curr, index) => {
      const imgStr = localStorage.getItem(`selfie64_${index}`)
      return acc + (imgStr || '')
    }, '')

    const cookieJS = parseCookie(document.cookie)

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