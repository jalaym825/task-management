import OpenInNew from '@mui/icons-material/OpenInNew';
import { Button, Card, CardActions, CardContent, Divider, FormControl, FormLabel, Input, Typography } from '@mui/joy';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import userApi from '../../api/users';
import config from '../../config.json';
import { NoPage } from '../Includes/NoPage';


export const UserProfile = ({ profilePage = false, userData }) => {
    let { id } = useParams();
    const [user, setUser] = React.useState("loading");
    if (profilePage)
        id = userData?.userid
    useEffect(() => {
        (async () => {
            const res = await userApi.get(`/${profilePage ? userData?.userid : id}`);
            setUser(res.data.user);
        })()
    }, [])

    const handleSave = async () => {
        await userApi.put(`/${user.userid}`, user);
    }
    return (
        <>
            {
                userData && userData.userid && (profilePage || id === userData.userid || config.admins.includes(userData.userid)) ?
                    user === "loading"
                        ?
                        <Container className='d-flex justify-content-center mb-4'>
                            <div className="loading-wave">
                                <div className="loading-bar"></div>
                                <div className="loading-bar"></div>
                                <div className="loading-bar"></div>
                                <div className="loading-bar"></div>
                            </div>
                        </Container>
                        :
                        user === null
                            ?
                            <NoPage />
                            :

                            <Container className='my-3'>

                                <form onSubmit={handleSave} className='d-flex jutify-content-center'>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            maxHeight: 'max-content',
                                            mx: 'auto',
                                            overflow: 'auto',
                                        }}
                                    >
                                        <Typography level="title-lg" >
                                            User Information
                                        </Typography>
                                        <Divider inset="none" />
                                        <CardContent
                                            sx={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                                                gap: 1.5,
                                            }}
                                        >
                                            <FormControl >
                                                <FormLabel>UserId</FormLabel>
                                                <Input defaultValue={user.userid} placeholder='UserId' disabled />
                                            </FormControl>
                                            <FormControl >
                                                <FormLabel>Name</FormLabel>
                                                <Input defaultValue={user.name} placeholder='Name' onChange={(newVal => setUser({ ...user, name: newVal.target.value }))} required />
                                            </FormControl>
                                            <FormControl >
                                                <FormLabel>Email</FormLabel>
                                                <Input defaultValue={user.email} placeholder='Email' onChange={(newVal => setUser({ ...user, email: newVal.target.value }))} required />
                                            </FormControl>
                                            <FormControl >
                                                <FormLabel>Mobile Number</FormLabel>
                                                <Input defaultValue={user.mobilenumber} placeholder='Mobile Number' onChange={(newVal => setUser({ ...user, mobilenumber: newVal.target.value }))} required />
                                            </FormControl>
                                        </CardContent>
                                        <CardActions>
                                            <Button type='submit' variant="solid" color="primary">
                                            {/* <Button onClick={handleSave} type='submit' variant="solid" color="primary"> */}
                                                Save
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </form>

                                <Container className='d-flex justify-content-center my-4'>
                                    <Button component={Link} to={`/${id}/tasks`} startDecorator={<OpenInNew />}>
                                        Open Tasks
                                    </Button>
                                </Container>

                                <Container className='m-4'></Container>
                            </Container>
                    :
                    <NoPage message={profilePage ? "Please login first to view the profile" : "403: Access Denied"} />
            }
        </>
    )
}