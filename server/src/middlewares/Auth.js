'use strict';

const jwt = require('jsonwebtoken');

const { User } = require('../models');

module.exports = async (req, res, next) => {
  if (!isAPI(req)) {
    if (req.session.authUser) {
      return next();
    }
    return res.redirect('/user/login');
  }
  let reqToken =
    (req.body['headers'] && req.body['headers']['Authorization']) ||
    req.query.token ||
    req.get('Authorization');
  if (!reqToken) {
    return res.status(401).json({
      data: 'Not Authorized',
    });
  }
  if (reqToken.startsWith('Monolowana') || reqToken.startsWith('monolowana')) {
    reqToken = reqToken.split(' ')[1];
  }
  req.token = reqToken;
  const token = jwt.decode(req.token, process.env.SECRET);
  const now = new Date();
  const expire = new Date(token.payload.expires);
  if (now.getTime() >= expire.getTime()) {
    return res.status(401).json({
      data: 'Not Authorized',
    });
  }
  const user = await User.findOne({
    email: token.payload.email,
    jwt: reqToken,
  });
  if (!user) {
    return res.status(401).json({
      data:
        'Not Authorized. JWT is either not valid or active for the specified user',
    });
  }
  req.user = token.payload;
  next();
};

function isAPI(req) {
  return req.originalUrl.indexOf('/api') === 0;
}
