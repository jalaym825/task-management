import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { ErrorToast } from './ErrorToast';
import api from '../../../api/users';
import config from '../../../config.json'

export const SignupForm = (props) => {
    const navigate = useNavigate();
    let initState = {
        email: "",
        userid: "",
        password: "",
        name: "",
        mobilenumber: "",
    }
    props.userInfo && (initState = props.userInfo);

    const isPasswordSecure = (password) => {
        const requirements = new Map([
            ["lowerCase", true],
            ["upperCase", true],
            ["numeric", true],
            ["specialChar", true],
            ["eightChars", true]
        ])

        const tempMap = {
            "lowerCase": "one lowercase",
            "upperCase": "one uppercase",
            "number": "one number",
            "specialChar": "one special character",
            "eightChars": "eight characters",
        }

        let regex = new RegExp("^(?=.*[a-z])");
        if (!regex.test(password))
            requirements.set("lowerCase", false);

        regex = new RegExp("^(?=.*[A-Z])");
        if (!regex.test(password))
            requirements.set("upperCase", false);

        regex = new RegExp("^(?=.*[0-9])");
        if (!regex.test(password))
            requirements.set("numeric", false);

        regex = new RegExp("^(?=.*[!@#$%^&*])");
        if (!regex.test(password))
            requirements.set("specialChar", false);

        regex = new RegExp("^(?=.{8,})");
        if (!regex.test(password))
            requirements.set("eightChars", false);

        const errors = [];
        requirements.forEach((key, val) => {
            if (key === false)
                errors.push(tempMap[val]);
        })
        if (errors.length > 0) {
            setDesc(`Your password must includes: ${errors.join(", ")}`)
            setShow(true);
            return false;
        }
        return true;
    };

    const isMobileNumberValid = (mNo) => {
        const regexExp = /^[6-9]\d{9}$/gi;
        return mNo.match(regexExp);
    }

    const isUserIdValid = (userId) => {
        return /^[a-zA-Z0-9]+$/.test(userId);
    }

    let [state, setState] = useState(initState);
    const [show, setShow] = useState(false);
    const [desc, setDesc] = useState("");

    const updateState = (obj) => {
        setState(prevState => { return { ...prevState, ...obj } });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { password, email, userid, mobilenumber } = state;
        if (!isPasswordSecure(password)) return;

        if (!isUserIdValid(userid)) {
            setDesc("User id shoud only contain lowercase alphabets and numbers")
            setShow(true);
            return;
        }

        if (!isMobileNumberValid(mobilenumber)) {
            setDesc("Mobile number is invalid")
            setShow(true);
            return;
        }

        let res = await api.get(`/${email}`);
        if (res.data.user) {
            setDesc("An account with the given email address already exists, please provide a different email address")
            setShow(true);
            return;
        }
        res = await api.get(`/${userid}`);
        if (res.data.user) {
            setDesc("User Id is already taken, please change User Id")
            setShow(true);
            return;
        }
        res = await api.post(`/`, state);
        if (res.data.user) {
            props.setInfo({ ...res.data.user, admin: config.admins.includes(res.data.user.userid) });
            navigate("/");
        }
    }

    return (
        <>
            <ErrorToast desc={desc} show={show} setShow={setShow} />
            <Form onSubmit={handleSubmit} method="post">
                <Container className='text-center mb-3'><h3>Sign Up</h3></Container>
                <Form.Group className="mb-3" >
                    <Form.Label>Email address*</Form.Label>
                    <Form.Control type="email" required={true} placeholder="Enter email address" value={state.email} onChange={(e) => updateState({ email: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>User Id*</Form.Label>
                    <Form.Control type="text" required={true} placeholder="Enter User Id" value={state.userid} onChange={(e) => updateState({ userid: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Name*</Form.Label>
                    <Form.Control type="text" required={true} placeholder="Enter your name" value={state.name} onChange={(e) => updateState({ name: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-4" >
                    <Form.Label>Password*</Form.Label>
                    <Form.Control type="password" required={true} placeholder="Enter password" value={state.password} onChange={(e) => updateState({ password: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-4" >
                    <Form.Label>Mobile Number*</Form.Label>
                    <Form.Control type="text" required={true} placeholder="Enter mobile number" value={state.mobilenumber} onChange={(e) => updateState({ mobilenumber: e.target.value })} />
                </Form.Group>
                <Container className='d-flex justify-content-center'>
                    <Button variant="primary" type="submit" className='px-3'>
                        Sign Up
                    </Button>
                </Container>
                <Row className='mt-4'>
                    <Col><hr className='hr-text' /></Col>
                    <Col className='col-2 text-center'>OR</Col>
                    <Col><hr className='hr-text' /></Col>
                </Row>
                <Row>
                    <Container className='text-center mt-3'>
                        Have an acount? <Link to="/login">Login</Link>
                    </Container>
                </Row>

            </Form>
        </>
    )
}