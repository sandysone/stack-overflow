import ListGroup from 'react-bootstrap/ListGroup'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import Head from 'next/head'

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
    <Head>
      {/* <link rel="manifest" href="../manifest.json" /> */}
      <link rel="shortcut icon" href="../favicon.png" />
    </Head>

    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Stack Overflow</Navbar.Brand>
      <Button variant="primary">
        {'Post Question'}
      </Button>
    </Navbar>

    <ListGroup>
      {fakeQuestions.map(mapQuestions2)}
    </ListGroup>
  </>
)