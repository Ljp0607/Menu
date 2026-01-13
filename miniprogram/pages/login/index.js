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
    
    if (!username || !password) {
      this.setData({
        errorMsg: '请输入用户名和密码'
      });
      return;
    }
    
    // 验证登录信息
    const user = this.userTable.find(item => item.username === username && item.password === password);
    
    if (user) {
      // 登录成功，保存登录状态
      wx.setStorageSync('isLoggedIn', true);
      wx.setStorageSync('userType', user.role);
      wx.setStorageSync('username', user.username);
      
      // 根据用户角色跳转到不同页面
      if (user.role === 'admin') {
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
      this.setData({
        errorMsg: '用户名或密码错误'
      });
    }
  }
});