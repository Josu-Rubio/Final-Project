'use strict';

module.exports = (error, req, res, next) => {
  const jsonError = {
    status: error.status || 500,
    data: error.description || error.message || 'Uncontrolled error',
  };
  if (error.array) {
    const errInfo = error.array({ onlyFirstError: true })[0];
    jsonError.status = 422;
    jsonError.data = `Validation failed: ${errInfo.param} ${errInfo.msg}`;
  } else if (error.status === 422) {
    jsonError.data = `Validation failed: ${error.param} ${error.msg}`;
  }
  if (isAPI(req)) {
    return res.status(jsonError.status).json(jsonError);
  }
  if (jsonError.status === 404) {
    return res.render('pages/error404');
  }
  res.locals.message = jsonError.data;
  res.locals.error = error;
  next({ error: jsonError });
};

function isAPI(req) {
  return req.originalUrl.indexOf('/api') === 0;
}
