import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorToast } from './ErrorToast';
import api from '../../../api/users';
import config from '../../../config.json'

export const LoginForm = (props) => {
    const navigate = useNavigate();
    let initState = {
        emailOruserId: "",
        password: ""
    }
    props.userInfo && (initState = props.userInfo);

    let [state, setState] = useState(initState);
    const [show, setShow] = useState(false);
    const [desc, setDesc] = useState("");

    const updateState = (obj) => {
        setState(prevState => { return { ...prevState, ...obj } });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let res;
        if (e.target[2].checked)
            res = await api.get(`/login/${state.emailOruserId}`, {
                params: { password: state.password }
            })
        else
            res = await api.get(`/login/${state.emailOruserId}`, {
                params: { password: state.password }
            });

        if (res.data.error) {
            setDesc(res.data.error);
            setShow(true);
            return;
        }
        props.setInfo({ ...res.data.user, admin: config.admins.includes(res.data.user.userid) });
        navigate("/");
    }

    return (
        <>
            <ErrorToast desc={desc} show={show} setShow={setShow} />
            <Form onSubmit={handleSubmit} method="post">
                <Container className='text-center mb-3'><h3>Login</h3></Container>
                <Form.Group className="mb-3" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" required={true} placeholder="Enter email or username" value={state.emailOruserId} onChange={(e) => updateState({ emailOruserId: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-4" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required={true} placeholder="Enter password" value={state.password} onChange={(e) => updateState({ password: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me if you are admin" />
                </Form.Group>

                <Container className='d-flex justify-content-center'>
                    <Button variant="primary" type="submit" className='px-3'>
                        {props.buttonText ? props.buttonText : "Login"}
                    </Button>
                </Container>

                <Row className='mt-4'>
                    <Col><hr className='hr-text' /></Col>
                    <Col className='col-2 text-center'>OR</Col>
                    <Col><hr className='hr-text' /></Col>
                </Row>
                <Row>
                    <Container className='text-center mt-3'>
                        Don't have an acount? <Link to="/signup">Sign Up</Link>
                    </Container>
                </Row>
            </Form>
        </>
    )
}