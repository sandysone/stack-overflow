import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default () => (
  <>
    <Form>
      <Form.Group controlId="photo">
        <Form.Label>Selfie</Form.Label>
        <Form.Control type="file" capture="camera" accept="image/*" />
      </Form.Group>

      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control autoComplete="username" />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" autoComplete="current-password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        {'Register'}
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