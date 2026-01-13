// pages/mine/index.js
Page({
  data: {
    userInfo: {
      nickName: "用户",
      avatarUrl: "/images/avatar.png",
    },
    dailyLimit: 100,
    usedAmount: 0,
    remainingLimit: 100,
    orders: [],
  },

  onLoad() {
    // 检查登录状态
    const isLoggedIn = wx.getStorageSync('isLoggedIn');
    if (!isLoggedIn) {
      wx.redirectTo({
        url: '/pages/login/index'
      });
      return;
    }
    this.loadUserData();
    this.loadOrders();
  },

  onShow() {
    this.loadUserData();
    this.loadOrders();
  },

  // 加载用户数据
  loadUserData() {
    const today = new Date().toDateString();
    const userData = wx.getStorageSync("userData") || {};

    // 获取登录用户名
    const username = wx.getStorageSync("username") || "用户";

    if (userData.today !== today) {
      // 新的一天，重置额度
      userData.today = today;
      userData.usedAmount = 0;
      wx.setStorageSync("userData", userData);
    }

    const usedAmount = userData.usedAmount || 0;
    this.setData({
      userInfo: {
        nickName: username,
        avatarUrl: "/images/avatar.png",
      },
      usedAmount: usedAmount,
      remainingLimit: this.data.dailyLimit - usedAmount,
    });
  },

  // 加载订单数据
  loadOrders() {
    const orders = wx.getStorageSync("orders") || [];
    this.setData({
      orders: orders,
    });
  },

  // 查看订单详情
  viewOrderDetail(e) {
    const orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/order-detail/index?id=${orderId}`,
    });
  },

  // 重新设置每日额度
  resetLimit() {
    wx.showModal({
      title: "提示",
      content: "确定要重置今日额度吗？",
      success: (res) => {
        if (res.confirm) {
          const userData = wx.getStorageSync("userData") || {};
          userData.usedAmount = 0;
          wx.setStorageSync("userData", userData);

          this.setData({
            usedAmount: 0,
            remainingLimit: this.data.dailyLimit,
          });

          wx.showToast({
            title: "额度已重置",
            icon: "success",
          });
        }
      },
    });
  },
});
