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

    // 首先检查模拟用户列表，快速返回结果
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
      return;
    }

    // 如果模拟用户列表中没有找到，再尝试从数据库查找用户
    try {
      // 设置较短的超时时间，避免长时间等待
      const user = await User.findOne({ username: username.toLowerCase() })
        .lean()
        .exec();

      if (!user) {
        return res.status(401).json({ message: "用户名或密码错误" });
      }

      // 验证密码
      const isPasswordMatch = await User.findById(user._id)
        .select("password")
        .exec()
        .then((userDoc) => userDoc.matchPassword(password));

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
      // 数据库连接失败时，返回错误
      console.log("数据库连接失败，使用模拟登录");
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
