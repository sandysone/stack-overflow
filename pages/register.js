import { useGlobal } from 'reactn'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Link from 'next/link'
import Router from 'next/router'
import { useState } from 'react'
import Webcam from 'react-webcam'
import { useGeolocation } from 'react-recipes'

import { nativeFetcher } from '../lib/fetcher'

const Register = () => {
  const { latitude, longitude } = useGeolocation(true)
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState('')
  const [, setUser] = useGlobal()

  const webcamRef = React.useRef(null)

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot()
      setImage(imageSrc)
    },
    [webcamRef]
  )

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    const { username, password } = event.target

    const content = await nativeFetcher('/register', 'POST', {
      username: username.value,
      password: password.value,
      lat: latitude || 0,
      lon: longitude || 0,
      selfie64: image || ''
    })

    if (content.data?.valid) {
      setUser({
        id: content.data.id,
        username: content.data.username,
        role: content.data.role,
        selfie64: content.data.selfie64
      })

      document.cookie = `id=${content.data.id}`
      document.cookie = `username=${content.data.username}`
      document.cookie = `role=${content.data.role}`
      document.cookie = `selfie64=${content.data.selfie64}`

      Router.push('/')
    }

    setIsLoading(false)
  }

  const sizeImg = 200

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h4>Take a selfie</h4>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          height={sizeImg}
          width={sizeImg}
          videoConstraints={{ facingMode: 'user' }}
          style={{ borderRadius: 10 }}
        />
        <br />
        <Button variant="primary" onClick={capture}>
          {'Take picture'}
        </Button>
        <br />
        {
          image
            ? <img src={image} width={sizeImg} height={sizeImg} style={{ borderRadius: '50%' }} />
            : null
        }

        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control autoComplete="username" />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" autoComplete="current-password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          {isLoading ? <Spinner animation="border" size="sm" /> : 'Register'}
        </Button>
      </Form>

      <br />

      <Link href="/login">
        <a>Back to Login</a>
      </Link>
    </>
  )
}

export default Register