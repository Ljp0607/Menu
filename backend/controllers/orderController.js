const Order = require('../models/Order');
const User = require('../models/User');

// 创建新订单
const createOrder = async (req, res) => {
  try {
    const { userName, goods, totalPrice } = req.body;

    // 验证输入
    if (!userName || !goods || !totalPrice) {
      return res.status(400).json({ message: '请提供完整的订单信息' });
    }

    // 查找用户
    const user = await User.findOne({ username: userName.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    // 创建订单
    const order = await Order.create({
      userId: user._id,
      userName: user.username,
      goods,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('创建订单失败:', error.message);
    res.status(500).json({ message: '服务器错误，请稍后重试' });
  }
};

// 获取所有订单（管理员）
const getOrders = async (req, res) => {
  try {
    // 获取订单列表，按创建时间倒序排列
    const orders = await Order.find().sort({ createTime: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('获取订单列表失败:', error.message);
    res.status(500).json({ message: '服务器错误，请稍后重试' });
  }
};

// 获取单个订单详情
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    // 查找订单
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: '订单不存在' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('获取订单详情失败:', error.message);
    res.status(500).json({ message: '服务器错误，请稍后重试' });
  }
};

// 更新订单状态
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // 验证状态值
    if (!status || !['pending', 'completed'].includes(status)) {
      return res.status(400).json({ message: '请提供有效的订单状态' });
    }

    // 查找并更新订单
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ message: '订单不存在' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('更新订单状态失败:', error.message);
    res.status(500).json({ message: '服务器错误，请稍后重试' });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
};
