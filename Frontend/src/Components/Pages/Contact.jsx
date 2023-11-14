import React from 'react'
import './style.css';
import { Form, Row, Container } from 'react-bootstrap';
import { Button } from '@mui/joy';
export const Contact = () => {
  return (
    <>
      <div className="form1" style={{ backgroundColor: '#285064', width: '100%', height: '500px' }}>
        <Container fluid>
          <h4 className='text-center contact'>Contact Us </h4>
          <br />
          <br />
          <h5 className='text-center' style={{ color: 'white' }}>Do you have any questions? Do not hesitate to contact us, and we will try to accommodate you.</h5>
          <Form className='mt-4 mx-5 ' >
            <Row>
              <Form.Group className="mb-3 " style={{ width: '33%', color: 'white' }} controlId="Name">
                <Form.Label>Name *</Form.Label>
                <Form.Control type="name" placeholder="Name..." />
              </Form.Group>
              <Form.Group className="mb-3 " style={{ width: '33%', color: 'white' }} controlId="exampleForm.ControlInput1">
                <Form.Label>Email address *</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
              <Form.Group className="mb-3 " style={{ width: '33%', color: 'white' }} controlId="phoneNo">
                <Form.Label>Phone *</Form.Label>
                <Form.Control type="phone" placeholder="Phone..." />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" style={{ color: 'white' }} controlId=" Message">
              <Form.Label>Message *</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder='Message...' />
            </Form.Group>
            <div className="radio" style={{ display: 'inline', color: 'white' }}>
              <Form.Check aria-label="option 1" style={{ display: 'inline' }} />
              &nbsp;I’ve read and accept the
              <a href="/Contact" rel="noopener" className="fy-form-terms-link a-form-terms-link" style={{ color: 'white' }}> terms and conditions</a>
            </div>
          </Form>
          <br />
          <Container className='px-4'>
            <Button variant="solid" color="danger" size="md">
              Send
            </Button>
          </Container>
        </Container>
      </div>
    </>
  )
}

