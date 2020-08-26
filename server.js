const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});
const app = require('./app')

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log("DB connection successful!"))

const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`app running on port ${port}...`)
    });
