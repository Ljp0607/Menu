const express = require('express');
const router = express.Router();
const { login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// 登录路由
router.post('/login', login);

// 获取当前用户信息路由，需要认证
router.get('/me', protect, getMe);

module.exports = router;
