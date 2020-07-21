'use strict';

const bcrypt = require('bcrypt-nodejs');

const { User } = require('../models');
const { mail } = require('../utils');

module.exports = {
  changeLocale: async (req, res, next) => {
    const locale = req.params.locale;
    const backTo = req.get('referer');
    res.cookie('wallaclone-locale', locale, { maxAge: 1000 * 3600 * 24 * 20 });
    res.redirect(backTo);
  },

  formLogin: async (req, res, next) => {
    res.render('pages/login');
  },

  postLogin: async (req, res, next) => {
    const password = req.body.password;
    const email = req.body.email;
    const user = await User.findOne({ email: email, active: true });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        req.session.authUser = {
          id: user._id,
          name: user.name,
          email: user.email,
        };
        return res.redirect('/');
      }
    }
    res.locals.status = 401;
    res.locals.email = email;
    res.locals.error = res.__('Not authorized or inactive');
    res.render('pages/login');
  },

  logout: (req, res, next) => {
    req.session.destroy(() => {
      res.redirect('/user/login');
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

      res.locals.status = 201;
      res.locals.email = user.email;
      res.locals.error = res.__('Account activated. Please login.');
    } else {
      res.locals.status = 400;
      res.locals.error = res.__('Wrong token or expired');
    }
    res.render('pages/login');
  },

  formCreate: async (req, res, next) => {
    res.render('pages/newUser');
  },

  postCreate: async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.locals.status = 400;
      res.locals.error = res.__('Error email aLready exists.');
      return res.render('pages/newUser');
    }
    if (req.body.password === req.body.password2) {
      let user = await User.insert(new User({ ...req.body }));
      if (user) {
        const apiURL = `https://localhost:3000/apiv1/user/activate/${user.token}`;
        const webURL = `https://localhost:3000/user/activate/${user.token}`;
        mail({
          email: user.email,
          subject: 'Activate account',
          apiURL,
          webURL,
          view: 'new_user',
        });
        res.locals.status = 201;
        res.locals.email = user.email;
        res.locals.error = res.__(
          'Account created. Check your email to activate the account.'
        );
        return res.render('pages/login');
      } else {
        res.locals.status = 400;
        res.locals.error = res.__('Error trying to create the account.');
      }
    } else {
      res.locals.status = 400;
      res.locals.error = res.__('Error passwords should match.');
    }
    res.render('pages/newUser');
  },
};
