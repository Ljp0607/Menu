const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const User = require('../models/User');

// 保护路由的中间件
const protect = async (req, res, next) => {
  let token;

  // 检查请求头中是否有Authorization字段
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 提取令牌
      token = req.headers.authorization.split(' ')[1];

      // 验证令牌
      const decoded = jwt.verify(token, jwtConfig.secret);

      // 获取用户信息，不包含密码
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error('Token验证失败:', error.message);
      res.status(401).json({ message: '未授权访问，请重新登录' });
    }
  }

  if (!token) {
    res.status(401).json({ message: '未授权访问，缺少令牌' });
  }
};

// 管理员权限中间件
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: '没有权限访问此资源' });
  }
};

module.exports = { protect, admin };
