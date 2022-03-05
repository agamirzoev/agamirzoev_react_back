const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const newsRouter = require('./routes/news');
const regRouter = require('./routes/registration');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/auth/registration', regRouter);
app.use('/auth/login', loginRouter);
app.use('/news', newsRouter);

module.exports = app;
