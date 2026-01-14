const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

// 加载环境变量
dotenv.config();

// 创建Express应用
const app = express();

// 配置中间件
app.use(cors());
app.use(express.json());

// 注册路由
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// 连接到数据库（异步连接，不阻塞服务器启动）
connectDB().catch(err => {
  console.error('MongoDB连接失败，服务器仍将继续运行:', err.message);
});

// 根路由
app.get('/', (req, res) => {
  res.json({ message: '微信小程序后端API服务' });
});

// 处理404错误
app.use((req, res) => {
  res.status(404).json({ message: '请求的资源不存在' });
});

// 全局错误处理中间件
app.use((err, req, res, next) => {
  console.error('全局错误:', err.message);
  res.status(500).json({ message: '服务器内部错误' });
});

// 获取端口号
const PORT = process.env.PORT || 3000;

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器正在运行在 http://localhost:${PORT}`);
});
