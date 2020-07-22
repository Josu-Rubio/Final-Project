'use strict';

const { validationResult } = require('express-validator');
const moment = require('moment');

const { Product } = require('../models');

module.exports = {
  index: async (req, res, next) => {
    validationResult(req).throw();
    Product.list(
      req.query.name,
      req.query.sell,
      req.query.tag,
      req.query.price,
      parseInt(req.query.limit),
      parseInt(req.query.skip),
      req.query.fields,
      req.query.sort,
      function (error, results) {
        if (error) {
          return next({ error });
        }
        res.render('pages/index', {
          success: true,
          count: results.length,
          results: results,
          moment: moment,
          userName: req.session.name,
        });
      }
    );
  },

  detail: async (req, res, next) => {
    validationResult(req).throw();
    let result = await Product.findById(req.params.id);
    if (result) {
      return res.render('pages/detail', {
        success: true,
        result: result,
        moment: moment,
      });
    }
    res.render('pages/error404');
  },
};
