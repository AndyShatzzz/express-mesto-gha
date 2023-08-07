const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUserId = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: `По данному id: ${userId} пользователь не был найден` });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Данный id пользователя некорректен: ${userId}` });
      } else {
        res.status(500).send({ message: 'Непредвиденная ошибка' });
      }
    });
};

module.exports.postUsers = (req, res) => {
  const newUserData = req.body;

  User.create(newUserData)
    .then((newUser) => {
      res.status(201).send(newUser);
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

module.exports.patchUser = (req, res) => {
  const userId = req.user._id;

  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((updateUser) => {
      if (!updateUser) {
        res.status(404).send({ message: `По данному id:${userId} пользователь не был найден` });
      } else {
        res.status(200).send(updateUser);
      }
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

module.exports.patchUserAvatar = (req, res) => {
  const userId = req.user._id;

  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((updateUserAvatar) => {
      if (!updateUserAvatar) {
        res.status(404).send({ message: `По данному id:${userId} пользователь не был найден` });
      } else {
        res.status(200).send(updateUserAvatar);
      }
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
