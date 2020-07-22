'use strict';

const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);

const {
  AuthRoutes,
  UserRoutes,
  ProductRoutes,
  WebUserRoutes,
  WebProductRoutes,
} = require('./src/routes');
const { ErrorMiddleware, AuthMiddleware } = require('./src/middlewares');
const { i18nConfig } = require('./src/utils');

var app = express();

const db = require('./src/db');

// View Engine Setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Setup i18n
app.use(i18nConfig().init);

// Public path
app.use(express.static(path.join(__dirname, 'public')));

// Set local title
app.locals.title = 'Wallaclone App';

// Initializing Session system
app.use(
  session({
    name: 'wallaclone-session',
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 3600 * 24 * 2,
    },
    store: new mongoStore({
      mongooseConnection: db,
    }),
  })
);

// Web routes
app.use('/', WebProductRoutes());
app.use('/user', WebUserRoutes());

// API routes
app.use('/apiv1/user', UserRoutes());
app.use('/apiv1/products', ProductRoutes());
app.use('/apiv1/authenticate', AuthRoutes());
app.get('/favicon.ico', (req, res) => res.status(204));
app.use(AuthMiddleware, (req, res, next) =>
  next({ status: 404, description: 'Not found' })
);

app.use(ErrorMiddleware);

module.exports = app;
