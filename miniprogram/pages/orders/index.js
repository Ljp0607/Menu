// pages/orders/index.js
Page({
  data: {
    orders: [],
  },

  onLoad() {
    // 检查登录状态
    const isLoggedIn = wx.getStorageSync("isLoggedIn");
    if (!isLoggedIn) {
      wx.redirectTo({
        url: "/pages/login/index",
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
    const app = getApp();
    const token = wx.getStorageSync('token');
    const username = wx.getStorageSync('username');
    
    console.log('开始加载订单，用户名:', username, 'token:', token);
    
    // 发送请求到后端API获取订单列表
    wx.request({
      url: app.globalData.apiBaseUrl + '/orders',
      method: 'GET',
      header: {
        'Authorization': 'Bearer ' + token
      },
      success: (res) => {
        console.log('获取订单请求成功，状态码:', res.statusCode);
        console.log('获取订单响应数据:', res.data);
        
        if (res.statusCode === 200) {
          // 将后端返回的订单数据转换为前端需要的格式
          const orders = res.data.map(order => ({
            id: order._id,
            goods: order.goods,
            totalPrice: order.totalPrice,
            createTime: new Date(order.createTime).toLocaleString(),
            status: order.status,
            userName: order.userName // 添加用户名
          }));
          
          this.setData({
            orders: orders,
          });
          
          console.log('订单数据已更新，共', orders.length, '条订单');
        } else {
          console.error('获取订单失败，状态码:', res.statusCode, '响应:', res.data);
          wx.showToast({
            title: "获取订单失败",
            icon: "none",
          });
        }
      },
      fail: (err) => {
        console.error('获取订单失败:', err);
        wx.showToast({
          title: "获取订单失败，请检查网络连接",
          icon: "none",
        });
      }
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
