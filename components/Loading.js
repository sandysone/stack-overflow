import Spinner from 'react-bootstrap/Spinner'

export const Loading = () => {
  return (
    <>
      <div>
        <Spinner animation="border" />
      </div>
      <style jsx global>
        {`
      div {
        width: 100vw;
        height: 90vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      `}
      </style>
    </>
  )
}