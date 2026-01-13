// pages/order-detail/index.js
Page({
  data: {
    order: null,
  },

  onLoad(options) {
    const orderId = parseInt(options.id);
    this.loadOrderDetail(orderId);
  },

  // 加载订单详情
  loadOrderDetail(orderId) {
    const orders = wx.getStorageSync("orders") || [];
    const order = orders.find((item) => item.id === orderId);

    if (order) {
      this.setData({
        order: order,
      });
    } else {
      wx.showToast({
        title: "订单不存在",
        icon: "none",
        success: () => {
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        },
      });
    }
  },

  // 返回上一页
  goBack() {
    wx.navigateBack();
  },
});
