// pages/orders/index.js
Page({
  data: {
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

  // 清空所有订单
  clearOrders() {
    wx.showModal({
      title: "提示",
      content: "确定要清空所有订单吗？",
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync("orders");
          this.setData({
            orders: [],
          });
          wx.showToast({
            title: "订单已清空",
            icon: "success",
          });
        }
      },
    });
  },
});
