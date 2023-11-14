import { Button, Card, CardActions, CardContent, Checkbox, Divider, FormControl, FormLabel, Input, Textarea, Typography } from '@mui/joy';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import taskApi from '../../../api/tasks';

export const TaskModal = ({ edit, task, userid, setTasks, tasks, setTask, setTaskModal, setEdit }) => {
    const [title, setTitle] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [deadline, setDeadline] = useState(null);
    const handleSave = async (e) => {
        e.preventDefault();
        if (edit) {
            setEdit(false);
            tasks.forEach(t => {
                if (t.taskid === task.taskid) {
                    t.title = task.title;
                    t.description = task.description;
                    t.deadline = task.deadline;
                    t.completed = task.completed;
                }
            })
            setTasks(tasks);
            setTaskModal(false);
            taskApi.put(task.taskid, task);
        }
        else {
            const body = {
                userid: userid,
                title: title,
                description: taskDesc,
                createdat: new Date(Date.now()),
                deadline: new Date(deadline),
                completed: false
            }
            setTaskModal(false);
            const res = await taskApi.post(`/`, body);
            setTasks([...tasks, res.data.task]);
        }
    }
    return (
        <>
            <Container className='my-3'>
                <form onSubmit={handleSave}>
                    <Card
                        variant="outlined"
                        sx={{
                            maxHeight: 'max-content',
                            mx: 'auto',
                            overflow: 'auto',
                        }}
                    >
                        <Typography level="title-lg" >
                            Task Information
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
                                <FormLabel>Task Title</FormLabel>
                                <Input defaultValue={edit === true ? task.title : ""} placeholder='Task title' onChange={(newVal => {
                                    if (edit)
                                        setTask({ ...task, title: newVal.target.value })
                                    else
                                        setTitle(newVal.target.value)
                                })} required />
                            </FormControl>
                            <FormControl sx={{ gridColumn: '1/-1' }}>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    onChange={newVal => {
                                        if (edit)
                                            setTask({ ...task, description: newVal.target.value })
                                        else
                                            setTaskDesc(newVal.target.value)
                                    }}
                                    placeholder="Task description"
                                    defaultValue={edit === true ? task.description : ""}
                                    minRows={2}
                                    maxRows={4}
                                    required
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Deadline</FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb" >
                                    <DatePicker
                                        value={edit === true ? dayjs(task.deadline) : undefined}
                                        label="DD/MM/YYYY"
                                        disablePast
                                        onChange={(newValue) => {
                                            if (edit)

                                                setTask({ ...task, deadline: newValue.toISOString() })
                                            else
                                                setDeadline(newValue.toISOString())
                                        }}
                                        views={['year', 'month', 'day']}
                                        slotProps={{
                                            textField: { required: true },
                                        }}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                            {
                                edit === true &&
                                <FormControl>
                                    <FormLabel>Completed</FormLabel>
                                    <Checkbox checked={task.completed} label="Completed" sx={{ gridColumn: '1/-1', my: 1 }} onChange={(newVal) => setTask({ ...task, completed: newVal.target.checked })} />
                                </FormControl>
                            }
                            <CardActions sx={{ gridColumn: '1/-1' }}>
                                {/* <Button fullWidth type='submit' variant="solid" color="primary" onClick={handleSave}> */}
                                <Button fullWidth type='submit' variant="solid" color="primary">
                                    {edit === true ? "Save" : "Add"}
                                </Button>
                                <Button type='button' fullWidth className='my-2' onClick={() => {
                                    setEdit(false);
                                    setTaskModal(false)
                                }} color="neutral" variant='outlined'>Cancel</Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </form>
            </Container>
        </>
    )
}
