'use strict';

const express = require('express');
const app = express();
var port = process.env.PORT || 8080;

const Datastore = require('@google-cloud/datastore');
const ds = Datastore();

var passport = require('passport');
var flash    = require('connect-flash');

const winston = require('winston');
const LoggingWinston = require('@google-cloud/logging-winston');

var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// Create the logger ==========================================================
const Logger = winston.Logger;
const Console = winston.transports.Console;
const loggingWinston = LoggingWinston();
const logger = new Logger({
	level : 'info',
	transports : [
		new Console(),
		loggingWinston
	]
});

// Setup Other configurations =================================================
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'pug');

app.use(session({ secret: 'totallyrandomsecret'}));

/*
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
*/

// Routes =====================================================================

app.get('/', (req, res) => {
	logger.info('displaying index')
  	res.render('index.pug')
});

app.get('/login', (req, res) => {
	logger.info('displaying login')
	res.render('login.pug')
});

// ADD A HANDLER HERE FOR TESTING

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;
