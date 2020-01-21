import ListGroup from 'react-bootstrap/ListGroup'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
// import Router from 'next/router'
import Link from 'next/link'

const fakeQuestions = [
  { id: 1, title: 'How to batch React setState() calls together inside an async function?' },
  { id: 2, title: 'Why are React hooks named in this fashion useXXX?' },
  { id: 3, title: 'How do I find out if an emoji is usable in Discord.JS?' },
]

const mapQuestions2 = (question) => {
  const { id, title } = question

  return (
    <ListGroup.Item key={id}>
      <Link href={`/questions/${id}`}>
        <a>{title}</a>
      </Link>
    </ListGroup.Item>
  )
}

export default () => (
  <>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Stack Overflow</Navbar.Brand>
      <Link href="/ask">
        <Button variant="primary">
          {'Post Question'}
        </Button>
      </Link>
    </Navbar>

    <ListGroup>
      {fakeQuestions.map(mapQuestions2)}
    </ListGroup>
  </>
)