import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import Router from 'next/router'

import { parseCookie } from '../lib/cookie'

const size = 60

export const NavigationBar = ({ username, img }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Stack Overflow</Navbar.Brand>
      {
        username
          ? <Navbar.Text>Logged as {username?.toUpperCase()}</Navbar.Text>
          : <Navbar.Text>Browsing as Guest</Navbar.Text>
      }
      {
        username && img
          ? (
            <Navbar.Text>
              <img style={{ borderRadius: '50%' }} width={size} height={size} src={img} />
            </Navbar.Text>
          )
          : null
      }

      <Link href="/ask">
        <Button variant="primary" disabled={!Boolean(username)}>
          {username ? 'Ask Question' : 'Must be logged to ask'}
        </Button>
      </Link>

      {
        username
          ? (
            <Button variant="outline-secondary" onClick={() => {
              const cookieJS = parseCookie(document.cookie)
              const cookieEntries = Object.entries(cookieJS)

              cookieEntries.forEach(c => {
                document.cookie = `${c[0]}=; expires=Thu, 01 Jan 1970 00:00:01 GMT`
              })

              Router.reload()
            }}>
              {'Logout'}
            </Button>
          )
          : (
            <Button variant="outline-secondary" onClick={() => {
              Router.push('/login')
            }}>
              {'Login'}
            </Button>
          )
      }


    </Navbar>
  )
}