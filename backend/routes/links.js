const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getMyLinks,
  createLink,
  updateLink,
  deleteLink,
  reorderLinks,
  trackClick
} = require('../controllers/linkController');
const { protect } = require('../middleware/auth');

router.get('/my-links', protect, getMyLinks);

router.post('/', protect, [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('url').trim().isURL().withMessage('Valid URL is required')
], createLink);

router.put('/:id', protect, [
  body('title').optional().trim(),
  body('url').optional().trim().isURL()
], updateLink);

router.delete('/:id', protect, deleteLink);

router.put('/reorder', protect, [
  body('linkIds').isArray().withMessage('linkIds must be an array')
], reorderLinks);

router.post('/:linkId/click', trackClick);

module.exports = router;