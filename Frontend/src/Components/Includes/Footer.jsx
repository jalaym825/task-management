import React from 'react';
import { Link } from 'react-router-dom';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';


export const Footer = () => {
    return (

        <MDBFooter className='text-center' color='white' bgColor='dark'>
            <section className='d-flex justify-content-center justify-content-lg-between p-4' />

            <section className=''>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3' >
                        <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                {/* <MDBIcon icon="gem" className="me-3" /> */}
                                Task Management
                            </h6>
                            <p>
                                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit.
                            </p>
                        </MDBCol>

                        <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4 '>
                            <h6 className='text-uppercase fw-bold mb-4 '>Products</h6>
                            <p >
                                <Link to="/" style={{ textDecorationLine: 'none', color: 'white' }}>Home</Link>
                            </p>
                            <p>
                                <Link to="/about" style={{ textDecorationLine: 'none', color: 'white' }} >About Us</Link>
                            </p>
                            <p>
                                <Link to="/reservation" style={{ textDecorationLine: 'none', color: 'white' }}>Resevation</Link>
                            </p>
                            <p>
                                <Link to="/Contact" style={{ textDecorationLine: 'none', color: 'white' }}>Conatact</Link>
                            </p>
                        </MDBCol>

                        <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    1
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    2
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    3
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    4
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>
                                {/* <MDBIcon icon="home" className="me-2" /> */}
                                Surat.
                            </p>
                            <p>
                                {/* <MDBIcon icon="envelope" className="me-3" /> */}
                                jalaym123@gmail.com
                            </p>
                            <p>
                                {/* <MDBIcon icon="phone" className="me-3" /> */}
                                Jalay: +919999999999
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2023 Copyright
            </div>
        </MDBFooter>
    )
}
