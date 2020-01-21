import ListGroup from 'react-bootstrap/ListGroup'
import Link from 'next/link'

import { Navbar } from '../components/Navbar'

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

const Questions = () => {
  return (
    <>
      <Navbar />

      <ListGroup>
        {[].map(mapQuestions)}
      </ListGroup>
    </>
  )
}

Questions.getInitialProps = async (context) => {
  const { query } = context

  // const res = await fetch('https://api.github.com/repos/zeit/next.js')
  // const json = await res.json()
  // return { stars: json.stargazers_count }

  return { query }
}

export default Questions