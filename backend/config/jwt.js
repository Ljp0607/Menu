const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
};

module.exports = jwtConfig;
