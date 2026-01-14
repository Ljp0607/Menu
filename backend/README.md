# 微信小程序后端API服务

## 技术栈

- **后端框架**: Node.js + Express
- **数据库**: MongoDB
- **认证方式**: JWT (JSON Web Token)
- **API风格**: RESTful

## 项目结构

```
backend/
├── config/                  # 配置文件
│   ├── db.js               # 数据库连接配置
│   └── jwt.js              # JWT密钥配置
├── controllers/            # 控制器
│   ├── authController.js   # 认证相关
│   └── orderController.js  # 订单管理
├── middleware/             # 中间件
│   └── authMiddleware.js   # JWT认证中间件
├── models/                 # 数据模型
│   ├── User.js             # 用户模型
│   └── Order.js            # 订单模型
├── routes/                 # 路由
│   ├── authRoutes.js       # 认证路由
│   └── orderRoutes.js      # 订单路由
├── .env                    # 环境变量
├── package.json            # 项目依赖
└── server.js               # 服务器入口
```

## 环境要求

- Node.js 16.x 或更高版本
- MongoDB 4.x 或更高版本

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env` 文件并根据需要修改配置：

```bash
cp .env.example .env
```

主要配置项：

- `DB_URI`: MongoDB连接字符串
- `JWT_SECRET`: JWT密钥
- `JWT_EXPIRES_IN`: JWT过期时间
- `PORT`: 服务器端口号

### 3. 启动服务

```bash
npm start
```

服务将在 `http://localhost:3000` 上运行。

## API接口

### 认证相关

#### 登录

- **URL**: `/api/auth/login`
- **方法**: `POST`
- **请求体**: `{ "username": "admin", "password": "123456" }`
- **响应**: 
  ```json
  {
    "id": "user_id",
    "username": "admin",
    "role": "admin",
    "token": "jwt_token"
  }
  ```

#### 获取当前用户信息

- **URL**: `/api/auth/me`
- **方法**: `GET`
- **请求头**: `Authorization: Bearer jwt_token`
- **响应**: 
  ```json
  {
    "id": "user_id",
    "username": "admin",
    "role": "admin",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
  ```

### 订单管理

#### 创建订单

- **URL**: `/api/orders`
- **方法**: `POST`
- **请求体**: 
  ```json
  {
    "userName": "user1",
    "goods": [
      { "id": 1, "name": "商品1", "price": 10, "count": 2 }
    ],
    "totalPrice": 20
  }
  ```
- **响应**: 
  ```json
  {
    "id": "order_id",
    "userId": "user_id",
    "userName": "user1",
    "goods": ["..."],
    "totalPrice": 20,
    "status": "pending",
    "createTime": "2023-01-01T00:00:00.000Z"
  }
  ```

#### 获取所有订单（管理员）

- **URL**: `/api/orders`
- **方法**: `GET`
- **请求头**: `Authorization: Bearer jwt_token`
- **响应**: 
  ```json
  [
    {
      "id": "order_id",
      "userId": "user_id",
      "userName": "user1",
      "goods": ["..."],
      "totalPrice": 20,
      "status": "pending",
      "createTime": "2023-01-01T00:00:00.000Z"
    }
  ]
  ```

#### 获取单个订单详情（管理员）

- **URL**: `/api/orders/:id`
- **方法**: `GET`
- **请求头**: `Authorization: Bearer jwt_token`
- **响应**: 
  ```json
  {
    "id": "order_id",
    "userId": "user_id",
    "userName": "user1",
    "goods": ["..."],
    "totalPrice": 20,
    "status": "pending",
    "createTime": "2023-01-01T00:00:00.000Z"
  }
  ```

#### 更新订单状态（管理员）

- **URL**: `/api/orders/:id/status`
- **方法**: `PUT`
- **请求头**: `Authorization: Bearer jwt_token`
- **请求体**: `{ "status": "completed" }`
- **响应**: 
  ```json
  {
    "id": "order_id",
    "userId": "user_id",
    "userName": "user1",
    "goods": ["..."],
    "totalPrice": 20,
    "status": "completed",
    "createTime": "2023-01-01T00:00:00.000Z"
  }
  ```

## 开发说明

1. **添加新用户**：可以通过MongoDB Compass或其他MongoDB客户端直接插入用户数据，密码会在保存时自动加密。

2. **测试API**：可以使用Postman或其他API测试工具来测试API接口。

3. **前端集成**：前端可以通过`wx.request`方法调用后端API，需要在请求头中添加`Authorization: Bearer jwt_token`来进行身份验证。

## 注意事项

1. 确保MongoDB服务正在运行，并且连接字符串正确。
2. 在生产环境中，应该使用HTTPS协议，并修改JWT密钥为强密钥。
3. 定期备份数据库，以防止数据丢失。
4. 监控服务器日志，及时处理错误和异常情况。
