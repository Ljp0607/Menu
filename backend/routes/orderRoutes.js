const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// 创建新订单（不需要认证，用户可以直接提交订单）
router.post('/', createOrder);

// 获取所有订单（需要管理员权限）
router.get('/', protect, admin, getOrders);

// 获取单个订单详情（需要管理员权限）
router.get('/:id', protect, admin, getOrderById);

// 更新订单状态（需要管理员权限）
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
