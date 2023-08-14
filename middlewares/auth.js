const jwt = require('jsonwebtoken');

const { UnauthorizedError } = require('../errors/errors');
const errorMessage = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(errorMessage.unauthorizedErrorMessage);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (error) {
    throw new UnauthorizedError(errorMessage.needAuthorizationMessage);
  }

  req.user = payload;

  next();
};

module.exports = auth;
