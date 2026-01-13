// pages/admin-orders/index.js
Page({
  data: {
    orders: [],
  },

  onLoad() {
    // 检查登录状态和用户角色
    const isLoggedIn = wx.getStorageSync('isLoggedIn');
    const userType = wx.getStorageSync('userType');
    
    if (!isLoggedIn || userType !== 'admin') {
      wx.redirectTo({
        url: '/pages/login/index'
      });
      return;
    }
    
    this.loadOrders();
  },

  onShow() {
    this.loadOrders();
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
});