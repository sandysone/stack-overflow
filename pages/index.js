import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default () => (
  <>
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          {'Well never share your email with anyone else.'}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        {'Submit'}
      </Button>

      <style jsx global>{`
      body {
        margin: 0 auto;
        max-width: 30em;
        margin-top: 20px;
        padding: 0 15px;
      }
      `}</style>
    </Form>
  </>
)