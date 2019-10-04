// imports
require("dotenv").config();
const config = require('config');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const adminRouter = require('./routes/adminRoutes');
const userRouter = require('./routes/userRoutes');

// constants for connection
const PORT = process.env.PORT || 4000;
const MONGODB_CONNECTION_STRING = config.get("db.connection-string");

const app = express();

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/admin', adminRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => res.send('<center><h1>Server running</h1></center>'))

// database connection
mongoose
    .connect(MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(res => app.listen(PORT, () => {
        console.log('Database connection successful')
        console.log('Server started on port: ', PORT)
    }))
    .catch(error => console.error());
