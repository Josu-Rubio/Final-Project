'use strict';

const express = require('express');
const { body } = require('express-validator');

const { UserCtrl } = require('../../controllers');

module.exports = () => {
  const router = express.Router();

  router.post(
    '/',
    [
      body('name')
        .isLength({ min: 1, max: 30 })
        .withMessage('Max 30 Characteres'),
      body('email')
        .isLength({ min: 3, max: 100 })
        .withMessage('Less than 100 characteres.'),
      body('password')
        .isLength({ min: 6 })
        .withMessage('Must be at least 6 characteres'),
    ],
    UserCtrl.create
  );

  return router;
};
