const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");
const User = require("../models/User");

// 生成JWT令牌
const generateToken = (id) => {
  return jwt.sign({ id }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
};

// 登录控制器
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 验证输入
    if (!username || !password) {
      return res.status(400).json({ message: "请提供用户名和密码" });
    }

    // 模拟用户列表
    const mockUsers = [
      { username: "admin", password: "123456", role: "admin" },
      { username: "周凡", password: "123456", role: "user" },
      { username: "李军鹏", password: "123456", role: "user" },
      { username: "侯雨晨", password: "123456", role: "user" },
      { username: "侯晨轩", password: "123456", role: "user" },
    ];

    // 直接使用模拟登录，快速返回结果，不再尝试访问数据库
    const mockUser = mockUsers.find(
      (item) => item.username === username && item.password === password
    );

    if (mockUser) {
      // 生成模拟令牌
      const mockToken = jwt.sign(
        { id: "mock_user_id_" + username },
        jwtConfig.secret,
        {
          expiresIn: jwtConfig.expiresIn,
        }
      );

      // 返回模拟用户信息和令牌
      res.status(200).json({
        id: "mock_user_id_" + username,
        username: mockUser.username,
        role: mockUser.role,
        token: mockToken,
      });
    } else {
      return res.status(401).json({ message: "用户名或密码错误" });
    }
  } catch (error) {
    console.error("登录失败:", error.message);
    res.status(500).json({ message: "服务器错误，请稍后重试" });
  }
};

// 获取当前用户信息
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.error("获取用户信息失败:", error.message);
    res.status(500).json({ message: "服务器错误，请稍后重试" });
  }
};

module.exports = {
  login,
  getMe,
};
