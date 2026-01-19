const mongoose = require("mongoose");
const Order = require("../models/Order");
const User = require("../models/User");

// 内存中的订单数组，用于存储所有提交的订单
const mockOrdersList = [
  {
    _id: "mock_order_1",
    userId: "mock_user_1",
    userName: "周凡",
    goods: [
      { id: 2, name: "有喜江西三杯鸡", price: 42, count: 1 },
      { id: 13, name: "南昌炒米粉", price: 28, count: 1 },
    ],
    totalPrice: 70,
    status: "pending",
    createTime: new Date().toISOString(),
  },
  {
    _id: "mock_order_2",
    userId: "mock_user_2",
    userName: "李军鹏",
    goods: [{ id: 1, name: "老火煨山笋", price: 36, count: 2 }],
    totalPrice: 72,
    status: "completed",
    createTime: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    _id: "mock_order_3",
    userId: "mock_user_3",
    userName: "侯雨晨",
    goods: [{ id: 3, name: "赣南风味辣椒炒肉", price: 38, count: 1 }],
    totalPrice: 38,
    status: "pending",
    createTime: new Date(Date.now() - 7200000).toISOString(),
  },
];

// 创建新订单
const createOrder = async (req, res) => {
  try {
    const { userName, goods, totalPrice } = req.body;

    // 验证输入
    if (!userName || !goods || !totalPrice) {
      return res.status(400).json({ message: "请提供完整的订单信息" });
    }

    console.log("接收到新订单请求，userName:", userName, "totalPrice:", totalPrice);
    console.log("接收到的goods:", goods);

    // 生成模拟订单ID
    const mockOrderId = "mock_order_" + Date.now();

    // 创建新订单
    const newOrder = {
      _id: mockOrderId,
      userId: "mock_user_id_" + userName,
      userName: userName,
      goods: goods,
      totalPrice: totalPrice,
      status: "pending",
      createTime: new Date().toISOString(),
    };

    // 将新订单添加到内存数组中
    mockOrdersList.push(newOrder);
    console.log("新订单已添加到内存数组:", newOrder._id);
    console.log("当前mockOrdersList长度:", mockOrdersList.length);
    console.log("当前mockOrdersList内容:", mockOrdersList.map(order => ({ _id: order._id, userName: order.userName })));

    // 返回新订单数据
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("创建订单失败:", error.message);
    res.status(500).json({ message: "服务器错误，请稍后重试" });
  }
};

// 获取订单列表
const getOrders = async (req, res) => {
  try {
    // 从请求头中获取用户信息（由auth中间件设置）
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "未授权访问，请重新登录" });
    }

    console.log(
      "获取订单列表，用户角色:",
      user.role,
      "用户名:",
      user.username,
      "总订单数:",
      mockOrdersList.length
    );

    let filteredOrders = [];

    if (user.role === "admin") {
      // 管理员可以获取所有订单
      filteredOrders = mockOrdersList;
    } else {
      // 普通用户只能获取自己的订单
      filteredOrders = mockOrdersList.filter(
        (order) => order.userName === user.username
      );
    }

    res.status(200).json(filteredOrders);
  } catch (error) {
    console.error("获取订单列表失败:", error.message);
    res.status(500).json({ message: "服务器错误，请稍后重试" });
  }
};

// 获取单个订单详情
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    // 从请求头中获取用户信息（由auth中间件设置）
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "未授权访问，请重新登录" });
    }

    console.log(
      "获取订单详情，订单ID:",
      id,
      "用户角色:",
      user.role,
      "用户名:",
      user.username
    );

    // 查找订单
    const order = mockOrdersList.find((item) => item._id === id);

    if (!order) {
      return res.status(404).json({ message: "订单不存在" });
    }

    // 权限检查
    if (user.role !== "admin" && order.userName !== user.username) {
      return res.status(403).json({ message: "没有权限访问此订单" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("获取订单详情失败:", error.message);
    res.status(500).json({ message: "服务器错误，请稍后重试" });
  }
};

// 更新订单状态
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // 验证状态值
    if (!status || !["pending", "completed"].includes(status)) {
      return res.status(400).json({ message: "请提供有效的订单状态" });
    }

    // 从请求头中获取用户信息（由auth中间件设置）
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "未授权访问，请重新登录" });
    }

    // 只有管理员可以更新订单状态
    if (user.role !== "admin") {
      return res.status(403).json({ message: "没有权限更新订单状态" });
    }

    console.log(
      "更新订单状态，订单ID:",
      id,
      "新状态:",
      status,
      "管理员:",
      user.username
    );

    // 查找订单
    const orderIndex = mockOrdersList.findIndex((item) => item._id === id);

    if (orderIndex === -1) {
      return res.status(404).json({ message: "订单不存在" });
    }

    // 更新订单状态
    mockOrdersList[orderIndex].status = status;

    // 返回更新后的订单
    res.status(200).json(mockOrdersList[orderIndex]);
  } catch (error) {
    console.error("更新订单状态失败:", error.message);
    res.status(500).json({ message: "服务器错误，请稍后重试" });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
};
