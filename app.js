require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/*
 * Routers
 */

app.use(require('./routes'));

/*
 * Catch 404 and forward to error handler
 */

app.use(function (req, res, next) {
  res.redirect(`${process.env.MAIN_SITE_URL}`);
});

module.exports = app;
