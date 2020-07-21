'use strict';

const express = require('express');

const { WebUserCtrl } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

module.exports = () => {
  const router = express.Router();

  router.get(
    '/change-locale/:locale',
    AuthMiddleware,
    WebUserCtrl.changeLocale
  );

  router.get('/logout', AuthMiddleware, WebUserCtrl.logout);
  router.get('/login', WebUserCtrl.formLogin);
  router.post('/login', WebUserCtrl.postLogin);
  router.get('/activate/:token', WebUserCtrl.activate);
  router.get('/create', WebUserCtrl.formCreate);
  router.post('/create', WebUserCtrl.postCreate);

  return router;
};
