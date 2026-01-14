// app.js
App({
  globalData: {
    // API基础URL
    apiBaseUrl: 'http://localhost:3000/api',
    // 用户数据
    userData: {
      today: new Date().toDateString(),
      usedAmount: 0,
    },
    // 每日额度
    dailyLimit: 100,
  },

  onLaunch: function () {
    this.initUserData();

    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: this.globalData.env,
        traceUser: true,
      });
    }
  },

  onShow: function () {
    // 检查登录状态
    const isLoggedIn = wx.getStorageSync('isLoggedIn');
    const currentPage = getCurrentPages()[0];
    
    // 如果不是登录页面且未登录，跳转到登录页面
    if (currentPage && currentPage.route !== 'pages/login/index' && !isLoggedIn) {
      wx.redirectTo({
        url: '/pages/login/index'
      });
      return;
    }
    
    // 已登录，根据用户角色和当前页面进行权限控制
    if (isLoggedIn) {
      const userType = wx.getStorageSync('userType');
      const currentRoute = currentPage ? currentPage.route : '';
      
      // 管理员不能访问商品页面
      if (userType === 'admin' && currentRoute === 'pages/goods/index') {
        wx.switchTab({
          url: '/pages/orders/index'
        });
      }
    }
  },

  // 初始化用户数据
  initUserData: function () {
    const today = new Date().toDateString();
    const userData = wx.getStorageSync("userData") || {};

    if (userData.today !== today) {
      // 新的一天，重置额度
      userData.today = today;
      userData.usedAmount = 0;
      wx.setStorageSync("userData", userData);
    }

    this.globalData.userData = userData;
  },

  // 更新使用额度
  updateUsedAmount: function (amount) {
    const userData = this.globalData.userData;
    userData.usedAmount = (userData.usedAmount || 0) + amount;
    this.globalData.userData = userData;
    wx.setStorageSync("userData", userData);
  },

  // 获取剩余额度
  getRemainingLimit: function () {
    const usedAmount = this.globalData.userData.usedAmount || 0;
    return this.globalData.dailyLimit - usedAmount;
  },

  // 重置今日额度
  resetDailyLimit: function () {
    const userData = {
      today: new Date().toDateString(),
      usedAmount: 0,
    };
    this.globalData.userData = userData;
    wx.setStorageSync("userData", userData);
  },
});
