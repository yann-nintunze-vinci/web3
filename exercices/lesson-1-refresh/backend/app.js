var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var expensesRouter = require('./routes/expenses');

var app = express();

app.use(logger('dev'));
app.use(cors({
    origin: ['http://localhost:5173', /\.onrender\.com$/],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', expensesRouter);

module.exports = app;
