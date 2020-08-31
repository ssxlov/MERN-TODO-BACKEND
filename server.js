const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

const mongoURI = 'mongodb://localhost:27017/todoAPP';

mongoose
    .connect(
        mongoURI,
        { useNewUrlParser: true, useUnifiedTopology: true, createIndex: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const Users = require('./routes/user.route');
const Todos = require('./routes/todo.route')

app.use('/users', Users);
app.use('', Todos);

app.listen(port, function() {
    console.log('Server is running on port: ' + port)
});
