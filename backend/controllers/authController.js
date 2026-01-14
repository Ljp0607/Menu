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

    try {
      // 尝试从数据库查找用户
      const user = await User.findOne({ username: username.toLowerCase() });

      if (!user) {
        return res.status(401).json({ message: "用户名或密码错误" });
      }

      // 验证密码
      const isPasswordMatch = await user.matchPassword(password);

      if (!isPasswordMatch) {
        return res.status(401).json({ message: "用户名或密码错误" });
      }

      // 生成令牌
      const token = generateToken(user._id);

      // 返回用户信息和令牌
      res.status(200).json({
        id: user._id,
        username: user.username,
        role: user.role,
        token,
      });
    } catch (dbError) {
      // 数据库连接失败时，使用模拟登录
      console.log("数据库连接失败，使用模拟登录");

      // 模拟用户列表
      const mockUsers = [
        { username: "admin", password: "123456", role: "admin" },
        { username: "周凡", password: "123456", role: "user" },
        { username: "李军鹏", password: "123456", role: "user" },
        { username: "侯雨晨", password: "123456", role: "user" },
        { username: "侯晨轩", password: "123456", role: "user" },
      ];

      // 查找模拟用户
      const mockUser = mockUsers.find(
        (item) => item.username === username && item.password === password
      );

      if (!mockUser) {
        return res.status(401).json({ message: "用户名或密码错误" });
      }

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
