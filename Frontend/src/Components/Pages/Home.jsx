import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <>
            <section className='my-3 mb-5'>
                <Container>
                    <Row>
                        <Col className='col-12 text-center'>
                            <h3 className='main-heading'>
                                Our Company
                            </h3>
                            <div className='underline mx-auto my-4'></div>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem animi eligendi facere, quae eos error architecto nesciunt voluptatum dolor, esse iusto sed, autem unde sapiente. Reiciendis, mollitia. Consequatur, dicta laudantium.</p>
                            <Link to="/about" className='btn btn-warning shadow'>Read More</Link>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}
