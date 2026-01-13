// pages/login/index.js
Page({
  data: {
    username: '',
    password: '',
    errorMsg: ''
  },

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
    if ((username === 'user' || username === 'admin') && password === '123456') {
      // 登录成功，保存登录状态
      wx.setStorageSync('isLoggedIn', true);
      wx.setStorageSync('userType', username);
      
      // 跳转到商品页面
      wx.switchTab({
        url: '/pages/goods/index'
      });
    } else {
      this.setData({
        errorMsg: '用户名或密码错误'
      });
    }
  }
});