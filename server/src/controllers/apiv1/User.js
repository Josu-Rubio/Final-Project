'use strict';

const { validationResult } = require('express-validator');

const { User } = require('../../models');
const { mail } = require('../../utils');

module.exports = {
  create: async (req, res, next) => {
    try {
      validationResult(req).throw();
      let user = await User.findOne({ email: req.body.email }); // Try aswell with name
      if (user) {
        return next({
          status: 400,
          description: 'Error creating user: email already exists',
        });
      }
      user = await User.insert(new User({ ...req.body }));

      if (user) {
        mail({
          email: user.email,
          subject: 'Activate account',
          url: `http://localhost:3000/activate/${user.token}`,
          view: 'new_user',
        });
        return res.status(201).json({
          description: 'Check your email to activate the account',
          user: {
            id: user._doc._id,
            name: user._doc.name,
            email: user._doc.email,
          },
        });
      }
      next({
        status: 400,
        description: 'Error creating user',
      });
    } catch (error) {
      if (!error.array) console.log('Unknown error: ', error);
      next(error);
    }
  },
};
