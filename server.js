const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./configs/database');
const authRouter = require('./routers/auth.router');
const userRouter = require('./routers/user.router');
const dashBoardRouter = require('./routers/dashBoard.router');
const boardRouter = require('./routers/board.router');
const columnRouter = require('./routers/column.router');
const mongoose = require('mongoose');
const path = require('path');

// CONFIG .env
require('dotenv').config({ path: './configs/config.env' });

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Connect to DB
connectDB();

mongoose.connection.on('connected', () => {
    console.log('Connect DataBase Succesfully !!!');
});

app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: process.env.CLIENT_URL }));
    app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

app.use('/api', authRouter);
app.use('/api/user', userRouter);
app.use('/api/dashboard', dashBoardRouter);
app.use('/api/board', boardRouter);
app.use('/api/column', columnRouter);

app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'Page Not Found' })
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
})