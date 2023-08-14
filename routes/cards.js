const router = require('express').Router();

const {
  getCards,
  postCard,
  deleteCard,
  putCardLike,
  putDislikeCard,
} = require('../controllers/cards');

const { deleteCardId } = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', postCard);
router.delete('/:cardId', deleteCardId, deleteCard);
router.put('/:cardId/likes', putCardLike);
router.delete('/:cardId/likes', putDislikeCard);

module.exports = router;
