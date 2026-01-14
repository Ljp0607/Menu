const mongoose = require("mongoose");
const dotenv = require("dotenv");

// 加载环境变量
dotenv.config();

const dbURI = process.env.DB_URI;

// 连接到MongoDB数据库
const connectDB = async () => {
  try {
    // 移除了不支持的选项：useNewUrlParser和useUnifiedTopology
    await mongoose.connect(dbURI);
    console.log("MongoDB连接成功");
    return true;
  } catch (err) {
    console.error("MongoDB连接失败:", err.message);
    return false;
  }
};

module.exports = {
  dbURI,
  connectDB,
};
