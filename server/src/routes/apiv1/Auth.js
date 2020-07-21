'use strict';

const express = require('express');
const { body } = require('express-validator');

const { AuthMiddleware } = require('../../middlewares');
const { AuthCtrl } = require('../../controllers');

module.exports = () => {
  const router = express.Router();

  router.post(
    '/',
    [
      body('email')
        .isLength({ min: 3, max: 100 })
        .withMessage('Less than 100 characteres.'),
      body('password')
        .isLength({ min: 6 })
        .withMessage('Must be at least 6 characteres'),
    ],
    AuthCtrl.login
  );
  router.post('/checkjwt', AuthMiddleware, AuthCtrl.checkJWT);
  router.post('/logout', AuthMiddleware, AuthCtrl.logout);
  router.get('/activate/:token', AuthCtrl.activate);
  router.post('/reset/', AuthCtrl.requestReset);
  router.post('/reset/:token', AuthCtrl.reset);

  return router;
};
