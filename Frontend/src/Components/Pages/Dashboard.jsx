import OpenInNew from '@mui/icons-material/OpenInNew';
import { Button } from '@mui/joy';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import userApi from '../../api/users';
import config from '../../config.json'
import { AccessDenied } from '../Includes/AccessDenied'
import './style.css';

export const Dashboard = ({ userData }) => {
    const [filterModel, setFilterModel] = React.useState({
        items: [{ field: "completed", operator: "is", value: "false" }]
        // items: []
    });
    const [users, setUsers] = React.useState([]);
    useEffect(() => {
        (async () => {
            const res = await userApi.get('/');
            res.data.users = res.data.users.map(x => {
                x.id = x.userid
                return x
            })
            setUsers(res.data.users)
        })()
    }, [])

    const columns = [
        { field: 'userid', headerName: 'UserId', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        {
            field: 'profile', headerName: 'Profile', flex: 1, headerAlign: 'center', renderCell: (params) => {
                return <>
                    <Container className='d-flex justify-content-center'>
                        <Button component={Link} to={`/${params.row.userid}`} startDecorator={<OpenInNew />}>
                            Open
                        </Button>
                    </Container>
                </>
            }
        },
    ];

    return (
        <>
            {
                userData && userData.userid && config.admins.includes(userData.userid)
                    ?
                    users && users.length > 0
                        ?
                        <Container className='d-flex justify-content-center my-4'>
                            <DataGrid
                                autoHeight
                                sx={{
                                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                                        outline: "none !important",
                                    },
                                }}
                                initialState={{
                                    sorting: {
                                        sortModel: [{ field: 'deadline', sort: 'asc' }],
                                    },
                                }}
                                disableRowSelectionOnClick
                                rows={users}
                                columns={columns}
                                filterModel={filterModel}
                                onFilterModelChange={(e) => setFilterModel(e)}
                                slots={{ toolbar: GridToolbar }}
                                slotProps={{ toolbar: { showQuickFilter: true } }}
                            />
                        </Container>
                        :
                        <Container className='d-flex justify-content-center mb-4'>
                            <div className="loading-wave">
                                <div className="loading-bar"></div>
                                <div className="loading-bar"></div>
                                <div className="loading-bar"></div>
                                <div className="loading-bar"></div>
                            </div>
                        </Container>
                    :
                    <AccessDenied />
            }
        </>
    )
}