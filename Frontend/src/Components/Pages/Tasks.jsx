import { Button, Modal, ModalDialog, Stack, Divider, DialogTitle, DialogContent, DialogActions } from '@mui/joy';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { ErrorToast } from './Includes/ErrorToast';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import 'dayjs/locale/en-gb';
import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import taskApi from '../../api/tasks';
import { TaskModal } from './Includes/TaskModal';
import { NoPage } from '../Includes/NoPage';
import { useParams } from 'react-router-dom';
import './style.css';
import config from '../../config.json';

const dateFormatter = new Intl.DateTimeFormat('en-gb', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
});

export const Tasks = ({ tasksPage = false, userData, setUserData }) => {
  let { id } = useParams();
  if (tasksPage)
    id = userData?.userid
  const [filterModel, setFilterModel] = React.useState({
    items: [{ field: "completed", operator: "is", value: "false" }]
  });
  const [show, setShow] = React.useState(false);
  const [desc, setDesc] = React.useState("");
  const [edit, setEdit] = React.useState(false);
  const [tasks, setTasks] = React.useState(null);
  const [task, setTask] = React.useState(null);
  const [taskModal, setTaskModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);

  const columns = [
    { field: 'title', headerName: 'Task', flex: 2 },
    { field: 'createdat', headerName: 'Created At', type: 'date', valueFormatter: (params) => dateFormatter.format(new Date(params.value)), flex: 0.7 },
    { field: 'deadline', headerName: 'Deadline', type: 'date', valueFormatter: (params) => dateFormatter.format(new Date(params.value)), flex: 0.7 },
    { field: 'completed', headerName: 'Completed', type: 'boolean', flex: 0.8 },
    {
      field: 'taskLink', headerName: 'Link', flex: 0.8, headerAlign: 'center', sortable: false, renderCell: (params) => {
        return <>
          <Container className='d-flex justify-content-center'>
            <Button size="sm" color="neutral" onClick={() => {
              setTaskModal(true)
              setEdit(true)
              setTask(params.row)
            }}>
              Edit
            </Button>
            <Button size="sm" className='ms-2' color="danger" onClick={() => setDeleteModal(true)}>
              Delete
            </Button>

            <Modal open={deleteModal} onClose={() => setDeleteModal(false)}>
              <ModalDialog variant="outlined" role="alertdialog">
                <DialogTitle>
                  <WarningRoundedIcon />
                  Confirmation
                </DialogTitle>
                <Divider />
                <DialogContent>
                  Are you sure you want to delete the task?
                </DialogContent>
                <DialogActions>
                  <Button variant="solid" color="danger" onClick={() => {
                    taskApi.delete(`/${params.row.taskid}`);
                    setTasks(tasks.filter(t => t.taskid !== params.row.taskid))
                    setDeleteModal(false)
                  }}>
                    Delete
                  </Button>
                  <Button variant="plain" color="neutral" onClick={() => setDeleteModal(false)}>
                    Cancel
                  </Button>
                </DialogActions>
              </ModalDialog>
            </Modal>

          </Container>
        </>
      }
    }
  ];

  React.useEffect(() => {
    (
      async () => {
        const res = await taskApi.get(`/users/${tasksPage ? userData?.userid : id}`);
        setTasks(res.data.tasks);
      })()
  }, [])

  return (
    <>
      <ErrorToast desc={desc} show={show} setShow={setShow} />
      {
        userData && userData.userid && (tasksPage || id === userData.userid || config.admins.includes(userData.userid))
          ?
          tasks !== null ?
            <>
              <Row className='col-12'>
                <Col>
                  <Container className='d-flex justify-content-center my-4'>
                    <React.Fragment>
                      <Button variant="outlined" color="neutral" onClick={() => {
                        if (!userData.verified) {
                          setDesc("Please verify your account to add your first task")
                          setShow(true);
                        } else
                          setTaskModal(true)
                      }}>
                        Add new task
                      </Button>
                      <Modal open={taskModal} onClose={() => setTaskModal(false)}>
                        <ModalDialog
                          minWidth={400}
                          aria-labelledby="nested-modal-title"
                          aria-describedby="nested-modal-description"
                          sx={(theme) => ({
                            [theme.breakpoints.only('xs')]: {
                              top: 'unset',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              borderRadius: 0,
                              transform: 'none',
                              maxWidth: 'unset',
                            },
                          })}
                        >
                          <Stack spacing={1}>
                            <TaskModal setEdit={setEdit} setTaskModal={setTaskModal} setTask={setTask} userid={id} userData={userData} task={task} edit={edit} setTasks={setTasks} tasks={tasks} />
                          </Stack>
                        </ModalDialog>
                      </Modal>
                    </React.Fragment>
                  </Container>
                </Col>
              </Row>
              <Row className='col-12'>
                {
                  tasks.length > 0 ?
                    <Col>
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
                          rows={tasks}
                          columns={columns}
                          filterModel={filterModel}
                          onFilterModelChange={(e) => setFilterModel(e)}
                          slots={{ toolbar: GridToolbar }}
                          slotProps={{ toolbar: { showQuickFilter: true } }}
                        />
                      </Container>
                    </Col>
                    :
                    <Container className='d-flex justify-content-center'>
                      No tasks so far
                    </Container>
                }
              </Row>
            </>
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
          <NoPage message={tasksPage ? "Please login first to view the profile" : "403: Access Denied"} />
      }
    </>
  );
}