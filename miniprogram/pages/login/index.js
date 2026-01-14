// pages/login/index.js
Page({
  data: {
    username: '',
    password: '',
    errorMsg: ''
  },

  // 用户表
  userTable: [
    { username: 'admin', password: '123456', role: 'admin' },
    { username: '周凡', password: '123456', role: 'user' },
    { username: '李军鹏', password: '123456', role: 'user' },
    { username: '侯雨晨', password: '123456', role: 'user' },
    { username: '侯晨轩', password: '123456', role: 'user' }
  ],

  // 输入用户名
  inputUsername(e) {
    this.setData({
      username: e.detail.value
    });
  },

  // 输入密码
  inputPassword(e) {
    this.setData({
      password: e.detail.value
    });
  },

  // 登录
  login() {
    const { username, password } = this.data;
    const app = getApp();
    
    console.log('开始登录，用户名:', username);
    
    if (!username || !password) {
      this.setData({
        errorMsg: '请输入用户名和密码'
      });
      return;
    }
    
    // 发送请求到后端登录API
    wx.request({
      url: app.globalData.apiBaseUrl + '/auth/login',
      method: 'POST',
      data: {
        username,
        password
      },
      success: (res) => {
        console.log('登录请求成功，状态码:', res.statusCode);
        console.log('登录响应数据:', res.data);
        
        if (res.statusCode === 200) {
          // 登录成功，保存登录状态和token
          wx.setStorageSync('isLoggedIn', true);
          wx.setStorageSync('userType', res.data.role);
          wx.setStorageSync('username', res.data.username);
          wx.setStorageSync('token', res.data.token);
          
          console.log('登录成功，保存的token:', res.data.token);
          
          // 根据用户角色跳转到不同页面
          if (res.data.role === 'admin') {
            // 管理员跳转到订单页面
            wx.switchTab({
              url: '/pages/orders/index'
            });
          } else {
            // 普通用户跳转到商品页面
            wx.switchTab({
              url: '/pages/goods/index'
            });
          }
        } else {
          console.log('登录失败，状态码:', res.statusCode);
          this.setData({
            errorMsg: res.data.message || '用户名或密码错误'
          });
        }
      },
      fail: (err) => {
        console.error('登录请求失败:', err);
        this.setData({
          errorMsg: '登录失败，请检查网络连接'
        });
      },
      complete: (res) => {
        console.log('登录请求完成:', res);
      }
    });
  }
});