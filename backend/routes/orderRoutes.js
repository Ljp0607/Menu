const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// 创建新订单（不需要认证，用户可以直接提交订单）
router.post('/', createOrder);

// 获取订单列表（普通用户获取自己的订单，管理员获取所有订单）
router.get('/', protect, getOrders);

// 获取单个订单详情（普通用户只能获取自己的订单，管理员可以获取所有订单）
router.get('/:id', protect, getOrderById);

// 更新订单状态（需要管理员权限）
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
