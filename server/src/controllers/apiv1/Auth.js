'use strict';

const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');

const { User } = require('../../models');
const { mail } = require('../../utils');

module.exports = {
  login: async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (!user.active) {
        return next({
          status: 401,
          description: 'Account not active. Please check your mail.',
        });
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          expires: moment().add(60, 'minutes'),
        };
        const jwtoken = jwt.sign({ payload }, process.env.SECRET);
        user.jwt = jwtoken;
        user.expire = Date.now() + 3600000;
        user.save();
        return res.json({
          success: true,
          description: 'Authorization successful',
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            token: user.jwt,
          },
        });
      }
      return next({
        status: 401,
        description: 'Wrong password.',
      });
    }
    return next({
      status: 401,
      description: 'Account does not exist. Please create an account.',
    });
  },

  checkJWT: async (req, res, next) => {
    const user = await User.findOne({ email: req.user.email, active: true });
    return res.json({
      success: true,
      description: 'Authorization successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: user.jwt,
      },
    });
  },

  logout: async (req, res, next) => {
    const user = await User.findOne({ email: req.user.email });
    if (user) {
      user.expire = null;
      user.jwt = null;
      const response = await user.save();
      return res.json({
        success: true,
        description: 'Logged Out succesfully',
        user: {
          name: response.name,
          email: response.email,
          token: user.jwt,
        },
      });
    }
    return next({
      status: 401,
      description: 'User not logged in',
    });
  },

  activate: async (req, res, next) => {
    let user = await User.findOne({
      token: req.params.token,
      active: false,
      expire: { $gt: Date.now() },
    });
    if (user) {
      user.token = '';
      user.expire = '';
      user.active = true;
      user = await user.save();
      return res.json({
        success: true,
        description: 'Account activated succesfully',
      });
    }
    next({
      status: 401,
      message: 'Token not valid or expired.Please try again',
    });
  },

  requestReset: async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      user.token = crypto.randomBytes(20).toString('hex');
      user.expire = Date.now() + 360000;
      user = await user.save();
      mail({
        email: user.email,
        subject: 'Password reset',
        url: `http://localhost:3000/reset/${user.token}`,
        view: 'password_reset',
      });
      return res.json({
        success: true,
        description: 'Please check your mail to change password.',
      });
    }
    return next({
      status: 401,
      description: 'Account does not exist. Go to create an account.',
    });
  },

  reset: async (req, res, next) => {
    let user = await User.findOne({
      token: req.params.token,
      expire: { $gt: Date.now() },
    });
    if (user) {
      user.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(10)
      );
      user.token = null;
      user.expire = null;
      user.active = true;
      user = await user.save();
      return res.json({
        success: true,
        description: 'Password updated successfully.',
      });
    }
    next({ status: 401, error: 'Permission denied.' });
  },
};
