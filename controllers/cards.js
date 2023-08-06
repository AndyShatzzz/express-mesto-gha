const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(201).send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.postCard = (req, res) => {
  const userId = req.user._id;

  const { name, link } = req.body;

  Card.create({ name, link, owner: userId })
    .then((newCard) => {
      res.status(201).send(newCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Пожалуйста, проверьте правильность введенных данных.',
        });
      } else {
        res.status(500).send({ message: 'Непредвиденная ошибка' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Пожалуйста, проверьте правильность введенных данных.',
        });
      } else {
        res.status(500).send({ message: 'Непредвиденная ошибка' });
      }
    });
};

module.exports.putCardLike = (req, res) => {
  const userId = req.user._id;

  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Пожалуйста, проверьте правильность введенных данных.',
        });
      } else {
        res.status(500).send({ message: 'Непредвиденная ошибка' });
      }
    });
};

module.exports.putDislikeCard = (req, res) => {
  const userId = req.user._id;

  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Пожалуйста, проверьте правильность введенных данных.',
        });
      } else {
        res.status(500).send({ message: 'Непредвиденная ошибка' });
      }
    });
};
