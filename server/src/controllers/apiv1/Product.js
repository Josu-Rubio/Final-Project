'use strict';

const { validationResult } = require('express-validator');

const Sender = require('../../services/thumbnail/sender');
const { Product } = require('../../models');

module.exports = {
  select: async (req, res, next) => {
    try {
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
          if (!error) {
            return res.json({
              success: true,
              count: results.length,
              results: results,
            });
          }
          next({ error });
        }
      );
    } catch (error) {
      next(error);
    }
  },

  selectOne: async (req, res, next) => {
    try {
      validationResult(req).throw();
      let product = await Product.findOne({ slug: req.params.slug }).populate(
        'user'
      );
      if (product) {
        return res.json({
          success: true,
          result: product,
        });
      }
      next({ status: 404, error: 'Not Found' });
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      validationResult(req).throw();
      let product = new Product({ ...req.body });
      product.user = req.user.id;
      if (req.file) {
        product.img = `/images/products/original/${req.file.filename}`;
        product.thumbnail = product.img;
      }
      product = await product.save();
      if (product) {
        Sender(product.img, product._id);
        return res.json({
          success: true,
          result: product,
        });
      }
      // Error
      next({ error: 'No se ha podido insertar el anuncio' });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      validationResult(req).throw();
      const product = await Product.findOne({ slug: req.params.slug });
      if (!product) {
        return next({
          status: 404,
          error: 'Not Found',
        });
      } else if (product.user._id.toString() !== req.user.id) {
        return next({
          status: 401,
          error: 'You only can modify your products',
        });
      }
      const newProduct = new Product({ ...req.body });
      if (newProduct.sold) newProduct.booked = false;
      if (req.file) {
        newProduct.img = `/images/products/${req.file.filename}`;
        newProduct.thumbnail = image.img;
      }
      const responseProduct = await Product.updateProduct(
        product.id,
        newProduct
      );
      if (responseProduct) {
        return res.json({
          success: true,
          result: responseProduct,
        });
      }
      return next({
        status: 500,
        result: 'Unknown error.',
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      let product = await Product.findOne({ slug: req.params.slug });
      if (!product) {
        return next({
          status: 404,
          error: 'Not Found',
        });
      } else if (product.user._id.toString() !== req.user.id) {
        return next({
          status: 401,
          error: 'You can only delete your products',
        });
      }
      // Ok
      product = await Product.findByIdAndDelete(product._id);
      return res.json({
        success: true,
        result: product,
      });
    } catch (error) {
      next(error);
    }
  },

  tags: async (req, res, next) => {
    try {
      let results = await Product.find().distinct('tags');
      if (results) {
        return res.json({
          success: true,
          count: results.length,
          results: results,
        });
      }
      next({ status: 404, error: 'Not Found' });
    } catch (error) {
      next(error);
    }
  },
};
