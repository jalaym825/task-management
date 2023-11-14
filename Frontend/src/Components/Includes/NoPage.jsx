import React from 'react'
import { Container } from 'react-bootstrap'

export const NoPage = ({message}) => {
  return (
    <Container className='my-3 d-flex justify-content-center'>
      <h1>{message ? message : "Error 404: No page found."}</h1>
    </Container>
  )
}