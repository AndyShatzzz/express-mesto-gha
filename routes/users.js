const router = require('express').Router();

const {
  getUsers,
  getUserId,
  postUsers,
  patchUser,
  patchUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUserId);
router.post('/users', postUsers);
router.patch('/users/me', patchUser);
router.patch('/users/me/avatar', patchUserAvatar);

module.exports = router;
