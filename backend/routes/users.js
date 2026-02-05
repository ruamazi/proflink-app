const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { getProfile, updateProfile, updateUsername } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/profile/:username', getProfile);

router.put('/profile', protect, [
  body('displayName').optional().trim().isLength({ max: 50 }),
  body('bio').optional().trim().isLength({ max: 500 })
], updateProfile);

router.put('/username', protect, [
  body('username').isLength({ min: 3, max: 30 }).withMessage('Username must be 3-30 characters')
], updateUsername);

module.exports = router;