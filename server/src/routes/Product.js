'use strict';

const express = require('express');
const { query, param } = require('express-validator');

const { WebProductCtrl } = require('../controllers');

module.exports = () => {
  const router = express.Router();

  router.get(
    '/',
    [
      query('name')
        .optional()
        .isLength({ min: 1, max: 30 })
        .withMessage('Must have less than 30 characters'),
      query('price')
        .optional()
        .custom((value) => {
          let aux = value.split('-');
          let result = true;
          for (let i = 0; i < aux.length; i++) {
            if (aux[i] && isNaN(+aux[i])) {
              result = false;
            }
          }
          return result;
        })
        .withMessage('must be numeric'),
      query('skip')
        .optional()
        .isInt({ gt: 0 })
        .withMessage('must be a number greater than 0'),
      query('limit')
        .optional()
        .isInt({ gt: 0 })
        .withMessage('must be a number greater than 0'),
    ],
    WebProductCtrl.index
  );

  router.get(
    '/advert/:id',
    [
      param('id')
        .matches(/^[0-9a-fA-F]{24}$/)
        .withMessage('wrong format'),
    ],
    WebProductCtrl.detail
  );

  return router;
};
