const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAllUsers,
  toggleAdmin,
  toggleUserStatus,
  deleteUser,
  getUserDetails
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

router.use(protect, adminOnly);

router.get('/stats', getDashboardStats);

router.get('/users', getAllUsers);

router.get('/users/:id', getUserDetails);

router.put('/users/:id/toggle-admin', toggleAdmin);

router.put('/users/:id/toggle-status', toggleUserStatus);

router.delete('/users/:id', deleteUser);

module.exports = router;