const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const { PORT } = require('./config.json')
const cors = require('cors')

const app = express();

const port = PORT || 5000;

app.use(express.json());
app.use(cors()) // Use this after the variable declaration and before routes declaration
app.use('/api/users', require('./routes/usersRoutes'))
app.use('/api/tasks', require('./routes/tasksRoutes'))
app.use(errorHandler);

app.listen(port, () => {
    console.log("server running on port: " + port)
});

process.on('unhandledRejection', (error) => {
    console.log(error)
});
process.on("uncaughtException", (error, origin) => {
    const err = { error, origin }
    console.error(err);
})
process.on('uncaughtExceptionMonitor', (error, origin) => {
    const err = { error, origin }
    console.error(err);
});
process.on('exit', (error) => {
    console.error(error)
});