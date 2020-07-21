'use strict';

module.exports = {
  // Web
  WebUserCtrl: require('./User'),
  WebProductCtrl: require('./Product'),
  // API
  AuthCtrl: require('./apiv1/Auth'),
  UserCtrl: require('./apiv1/User'),
  ProductCtrl: require('./apiv1/Product'),
};
