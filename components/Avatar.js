import Image from 'react-bootstrap/Image'

export const Avatar = ({ source }) => {
  return (
    <>
      <Image src={source} roundedCircle />
    </>
  )
}