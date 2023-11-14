import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { SignupForm } from '../Pages/Includes/SignupForm';
import { Breadcrumbs, Typography } from '@mui/joy';
import { Link } from 'react-router-dom';

export const Signup = ({ setInfo }) => {
    return (
        <Container fluid className="px-0">
            <section className="bg-info py-3 mb-4">
                <Container>
                    <Row>
                        <Col className="col-6 my-auto">
                            <h4>Signup</h4>
                        </Col>
                        <Col className="col-6 my-auto d-flex justify-content-end">
                            <h6>
                                <Breadcrumbs size="md">
                                    <Link to="/">Home</Link>
                                    <Typography>Signup</Typography>
                                </Breadcrumbs>
                            </h6>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section>
                <Row className='d-flex justify-content-center m-0'>
                    <Col className="col-md-6 col-lg-4 col-sm-10">
                        <Container className='shadow my-5 py-3'>
                            <SignupForm setInfo={setInfo} />
                        </Container>
                    </Col>
                </Row>
            </section>
        </Container>
    )
}
