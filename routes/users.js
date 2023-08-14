const router = require('express').Router();

const {
  getUsers,
  getUserId,
  patchUser,
  patchUserAvatar,
  getUserMe,
} = require('../controllers/users');

const { userGetId } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/:userId', userGetId, getUserId);
router.patch('/me', patchUser);
router.patch('/me/avatar', patchUserAvatar);
router.get('/me', getUserMe);

module.exports = router;
