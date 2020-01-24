import { useGlobal } from 'reactn'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Link from 'next/link'
import Router from 'next/router'
import { useState } from 'react'
import Webcam from 'react-webcam'
// import { usePermission } from 'react-use'

import { nativeFetcher } from '../lib/fetcher'

const Register = () => {
  // const state = usePermission({ name: 'camera' })
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState('')
  const [user, setUser] = useGlobal()

  // if (typeof window !== 'undefined') {
  //   navigator.getUserMedia({ video: true }, (localMediaStream) => {
  //     console.log(localMediaStream)
  //   }, (error) => { })
  // }

  // const captureImage = () => {
  //   const context = this.canvas.getContext('2d')
  //   context.drawImage(this.videoStream, 0, 0, 800, 600)

  //   const image = this.canvas.toDataURL('image/jpeg', 0.5)
  //   return image
  // }

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

    const content = await nativeFetcher('/register', 'POST', { username: username.value, password: password.value })

    if (content.data?.valid) {
      setUser({ id: content.data.id, username: content.data.username, role: content.data.role })
      Router.push('/questions')
    }

    setIsLoading(false)
  }

  const sizeImg = 200
  const heightImg = 200
  const widthImg = 100

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        height={heightImg}
        width={widthImg}
        videoConstraints={{ facingMode: 'user' }}
        style={{ borderRadius: '7px' }}
      />
      <br />
      <Button variant="primary" onClick={capture}>
        {'Take picture'}
      </Button>
      <br />
      {
        image
          ? <img src={image} width={widthImg} height={heightImg} style={{ borderRadius: '50%' }} />
          : null
      }

      <Form onSubmit={handleSubmit}>
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
          {isLoading ? <Spinner animation="border" size="sm" /> : 'Register'}
        </Button>
      </Form>

      <br />

      <Link href="/">
        <a>Back to Login Page</a>
      </Link>
    </>
  )
}

export default Register