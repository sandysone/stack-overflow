import Alert from 'react-bootstrap/Alert'

export const Error = (props) => {
  return (
    <>
      <div>
        <Alert variant="danger">
          {'This is  alert—check it out! => ' + props.description}
        </Alert>
      </div>

      <style jsx global>
        {`
      div {
        // width: 100vw;
        // height: 90vh;
        // display: flex;
        // justify-content: center;
        // align-items: center;
      }
      `}
      </style>
    </>
  )
}