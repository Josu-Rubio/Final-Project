'use strict';
const express = require('express');
const { query, param, body } = require('express-validator');
const { AuthMiddleware } = require('../../middlewares');
const { ProductCtrl } = require('../../controllers');
const { MulterMiddleware } = require('../../middlewares');

module.exports = () => {
  const router = express.Router();
  router.get(
    '/',
    [
      query('name')
        .optional()
        .isLength({ min: 1, max: 30 })
        .withMessage('Value must be between 1 and 30 characteres length'),
      query('skip')
        .optional()
        .isInt({ gt: 0 })
        .withMessage('Must be a number greater than 0'),
      query('limit')
        .optional()
        .isInt({ gt: 0 })
        .withMessage('Must be a number greater than 0'),
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
    ],
    ProductCtrl.select
  );
  router.get('/tags', ProductCtrl.tags);
  router.get('/:slug', ProductCtrl.selectOne);
  router.put(
    '/:slug',
    AuthMiddleware,
    MulterMiddleware,
    [
      body('name')
        .optional()
        .isLength({ min: 1, max: 30 })
        .withMessage('value must be between 1 and 30 characteres length'),
      body('desc')
        .optional()
        .optional()
        .isLength({ min: 0, max: 140 })
        .withMessage('Less than 140 characteres.'),
    ],
    ProductCtrl.update
  );
  router.delete('/:slug', AuthMiddleware, MulterMiddleware, ProductCtrl.delete);
  router.post(
    '/',
    AuthMiddleware,
    MulterMiddleware,
    [
      body('name')
        .isLength({ min: 1, max: 30 })
        .withMessage('value must be between 1 and 30 characteres length'),
      body('desc')
        .optional()
        .isLength({ min: 0, max: 400 })
        .withMessage('Less than 140 characteres.'),
      body('price').isNumeric().withMessage('must be numeric'),
    ],
    ProductCtrl.create
  );
  return router;
};
