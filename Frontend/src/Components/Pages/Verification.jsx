import { Button } from '@mui/joy';
import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import userApi from '../../api/users';
import { ErrorToast } from './Includes/ErrorToast';

export const Verification = ({ userData, setUserData }) => {
    const [show, setShow] = React.useState(false);
    const [desc, setDesc] = React.useState("");
    const [errorMessage, setErrMessage] = React.useState("404 Not Found");
    const [validUrl, setValidUrl] = React.useState(true);
    const params = useParams();

    React.useEffect(() => {
        const verifyEmailUrl = async () => {
            if (userData && userData?.verified) {
                setErrMessage("User is already verified");
                setValidUrl(false);
                return;
            }
            if (params.token) {
                const res = await userApi.post(`/verify/${params.userid}`, { token: params.token });
                if (res.data.error) {
                    setErrMessage(res.data.error)
                    setValidUrl(false);
                    if (res.data.verified) {
                        setUserData({ ...userData, verified: true })
                    }
                } else {
                    setValidUrl(true);
                    setUserData({ ...userData, verified: true })
                }
            }
        };
        verifyEmailUrl();
    }, []);
    return (
        <>
            <ErrorToast desc={desc} show={show} setShow={setShow} />
            {
                params.token ?
                    validUrl ?
                        <Container className='my-3 d-flex justify-content-center'>
                            <h1>Email verified successfully</h1>
                        </Container>
                        :
                        <Container className='my-3 d-flex justify-content-center'>
                            <h1>{errorMessage}</h1>
                        </Container>
                    :
                    <Container className='my-3 d-flex justify-content-center'>
                        <Button onClick={async () => {
                            const res = await userApi.post(`/requestLink/${params.userid}`);
                            if (res.data.error) {
                                setDesc(res.data.error);
                                setShow(true);
                                console.log(res.data)
                                if (res.data.verified) {
                                    setUserData({ ...userData, verified: true })
                                }
                            }
                        }}>Resend Link</Button>
                    </Container>
            }
        </>
    )
}