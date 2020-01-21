import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import Router from 'next/router'

export const NavigationBar = ({ username }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Stack Overflow</Navbar.Brand>
      <Navbar.Text>Logged as {username?.toUpperCase()}</Navbar.Text>

      <Link href="/ask">
        <Button variant="primary">
          {'Ask Question'}
        </Button>
      </Link>

      <Button variant="outline-secondary" onClick={() => {
        document.cookie = `id=; expires=Thu, 01 Jan 1970 00:00:01 GMT`
        document.cookie = `username=; expires=Thu, 01 Jan 1970 00:00:01 GMT`
        Router.push('/')
      }}>
        {'Logout'}
      </Button>
    </Navbar>
  )
}