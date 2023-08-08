const Card = require('../models/card');
const { ErrorBadRequest, ErrorNotFound } = require('../errors/errors');
const errorMessage = require('../utils/constants');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((error) => next(error));
};

module.exports.postCard = (req, res, next) => {
  const userId = req.user._id;

  const { name, link } = req.body;

  Card.create({ name, link, owner: userId })
    .then((newCard) => {
      res.status(201).send(newCard);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrorBadRequest(errorMessage.ValidationErrorMessage));
      } else {
        next(error);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        next(new ErrorNotFound(errorMessage.cardNotFoundMessage));
      } else {
        res.send(card);
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ErrorBadRequest(errorMessage.cardBadRequestMessage));
      } else {
        next(error);
      }
    });
};

module.exports.putCardLike = (req, res, next) => {
  const userId = req.user._id;

  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        next(new ErrorNotFound(errorMessage.cardNotFoundMessage));
      } else {
        res.send({ data: card });
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ErrorBadRequest(errorMessage.cardBadRequestMessage));
      } else {
        next(error);
      }
    });
};

module.exports.putDislikeCard = (req, res, next) => {
  const userId = req.user._id;

  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        next(new ErrorNotFound(errorMessage.cardNotFoundMessage));
      } else {
        res.send({ data: card });
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ErrorBadRequest(errorMessage.cardBadRequestMessage));
      } else {
        next(error);
      }
    });
};
