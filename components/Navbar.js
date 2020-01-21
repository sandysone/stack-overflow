import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

export const Navbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Stack Overflow</Navbar.Brand>
      <Link href="/ask">
        <Button variant="primary">
          {'Ask Question'}
        </Button>
      </Link>
    </Navbar>
  )
}