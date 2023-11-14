import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Breadcrumbs, Typography } from '@mui/joy';
import { Link } from 'react-router-dom'

export const About = () => {
  return (
    <Container fluid className="px-0">
      <section className="bg-info py-3 mb-4">
        <Container>
          <Row>
            <Col className="col-6 my-auto">
              <h4>About Us</h4>
            </Col>
            <Col className="col-6 my-auto d-flex justify-content-end">
              <h6>
                <Breadcrumbs size="md">
                  <Link to="/">Home</Link>
                  <Typography>About</Typography>
                </Breadcrumbs>
              </h6>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        About Us
      </section>

    </Container>
  )
}
