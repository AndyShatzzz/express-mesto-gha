const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  createUsers,
  login,
} = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUsers);

router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));

module.exports = router;
