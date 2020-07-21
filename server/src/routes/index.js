'use strict';

module.exports = {
  // Web
  WebUserRoutes: require('./User'),
  WebProductRoutes: require('./Product'),
  // API
  AuthRoutes: require('./apiv1/Auth'),
  UserRoutes: require('./apiv1/User'),
  ProductRoutes: require('./apiv1/Product'),
};
