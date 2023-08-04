const ApiError = require('../exceptions/api-error');
const userService = require('../services/user-service');

module.exports = function (req, res, next) {
  try {
    const authorization_header = req.headers.authorization;
    if (!authorization_header) {
      return next(ApiError.UnauthorizedError());
    }

    const access_token = authorization_header.split(' ')[1];
    if (!access_token) {
      return next(ApiError.UnauthorizedError());
    }

    const user_data = userService.validateAccessToken(access_token);
    if (!user_data) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = user_data;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
