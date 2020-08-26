//app.js
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const todoRouter = require('./routes/todo.route');
const userRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

//app.use('/todos', todo);

app.use('', authRouter);
app.use('', todoRouter);
app.use('', userRouter);

// let port = 1234;
// app.listen(port, () => {
//     console.log('Server is up and running on port number ' + port);
// });

module.exports = app;
