import React from 'react';
import { Toast } from 'react-bootstrap';
import ToastContainer from 'react-bootstrap/ToastContainer';

export const ErrorToast = ({ desc, show, setShow }) => {
    return (
        <ToastContainer className='position-fixed bottom-0 end-0 p-3'>
            <Toast onClose={() => setShow(false)} show={show} delay={5000} autohide>
                <Toast.Header className='bg-danger'>
                    <strong className="me-auto">Error</strong>
                </Toast.Header>
                <Toast.Body className='bg-danger-subtle'>{desc}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}
