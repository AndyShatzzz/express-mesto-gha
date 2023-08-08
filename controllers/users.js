const User = require('../models/user');
const { ErrorBadRequest, ErrorNotFound } = require('../errors/errors');
const errorMessage = require('../utils/constants');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((error) => next(error));
};

module.exports.getUserId = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new ErrorNotFound(errorMessage.userNotFoundMessage));
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ErrorBadRequest(errorMessage.userBadRequestMessage));
      } else {
        next(error);
      }
    });
};

module.exports.postUsers = (req, res, next) => {
  const newUserData = req.body;

  User.create(newUserData)
    .then((newUser) => {
      res.status(201).send(newUser);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrorBadRequest(errorMessage.ValidationErrorMessage));
      } else {
        next(error);
      }
    });
};

module.exports.patchUser = (req, res, next) => {
  const userId = req.user._id;

  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((updateUser) => {
      if (!updateUser) {
        next(new ErrorNotFound(errorMessage.userNotFoundMessage));
      } else {
        res.send(updateUser);
      }
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrorBadRequest(errorMessage.ValidationErrorMessage));
      } else {
        next(error);
      }
    });
};

module.exports.patchUserAvatar = (req, res, next) => {
  const userId = req.user._id;

  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((updateUserAvatar) => {
      if (!updateUserAvatar) {
        next(new ErrorNotFound(errorMessage.userNotFoundMessage));
      } else {
        res.send(updateUserAvatar);
      }
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrorBadRequest(errorMessage.ValidationErrorMessage));
      } else {
        next(error);
      }
    });
};
