const jwt = require('jsonwebtoken');

// JWT配置
const jwtConfig = {
  secret: 'your_jwt_secret_key_here',
  expiresIn: '24h'
};

// 生成JWT令牌
const generateToken = (id) => {
  return jwt.sign({ id }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
};

// 生成普通用户周凡的JWT令牌
const username = '周凡';
const userId = 'mock_user_id_' + username;
const token = generateToken(userId);

console.log('生成的JWT令牌:');
console.log(token);
console.log('\n用户信息:');
console.log('用户名:', username);
console.log('用户ID:', userId);
