// pages/goods/index.js
Page({
  data: {
    goodsList: [
      {
        id: 1,
        name: "宫保鸡丁",
        price: 25,
        image: "/images/default-goods-image.png",
        description: "经典川菜，色香味俱全",
        count: 0,
      },
      {
        id: 2,
        name: "鱼香肉丝",
        price: 22,
        image: "/images/default-goods-image.png",
        description: "酸甜可口，下饭神器",
        count: 0,
      },
      {
        id: 3,
        name: "麻婆豆腐",
        price: 18,
        image: "/images/default-goods-image.png",
        description: "麻辣鲜香，豆腐嫩滑",
        count: 0,
      },
      {
        id: 4,
        name: "红烧肉",
        price: 35,
        image: "/images/default-goods-image.png",
        description: "肥而不腻，入口即化",
        count: 0,
      },
      {
        id: 5,
        name: "炒青菜",
        price: 12,
        image: "/images/default-goods-image.png",
        description: "清爽可口，健康营养",
        count: 0,
      },
      {
        id: 6,
        name: "西红柿炒鸡蛋",
        price: 15,
        image: "/images/default-goods-image.png",
        description: "经典家常菜，老少皆宜",
        count: 0,
      },
    ],
    totalPrice: 0,
    dailyLimit: 100,
    remainingLimit: 100,
  },

  onLoad() {
    // 从本地存储获取今日使用额度
    const today = new Date().toDateString();
    const userData = wx.getStorageSync("userData") || {};

    if (userData.today !== today) {
      // 新的一天，重置额度
      userData.today = today;
      userData.usedAmount = 0;
      wx.setStorageSync("userData", userData);
    }

    const usedAmount = userData.usedAmount || 0;
    this.setData({
      remainingLimit: this.data.dailyLimit - usedAmount,
    });
  },

  // 增加商品数量
  addGoods(e) {
    const index = e.currentTarget.dataset.index;
    const goods = this.data.goodsList[index];
    const newCount = goods.count + 1;
    const newTotalPrice = this.data.totalPrice + goods.price;

    if (newTotalPrice > this.data.dailyLimit) {
      wx.showToast({
        title: "超过每日额度",
        icon: "none",
      });
      return;
    }

    const goodsList = [...this.data.goodsList];
    goodsList[index].count = newCount;

    this.setData({
      goodsList: goodsList,
      totalPrice: newTotalPrice,
      remainingLimit: this.data.dailyLimit - newTotalPrice,
    });
  },

  // 减少商品数量
  reduceGoods(e) {
    const index = e.currentTarget.dataset.index;
    const goods = this.data.goodsList[index];

    if (goods.count <= 0) return;

    const newCount = goods.count - 1;
    const newTotalPrice = this.data.totalPrice - goods.price;

    const goodsList = [...this.data.goodsList];
    goodsList[index].count = newCount;

    this.setData({
      goodsList: goodsList,
      totalPrice: newTotalPrice,
      remainingLimit: this.data.dailyLimit - newTotalPrice,
    });
  },

  // 提交订单
  submitOrder() {
    if (this.data.totalPrice <= 0) {
      wx.showToast({
        title: "请选择商品",
        icon: "none",
      });
      return;
    }

    // 获取选中的商品
    const selectedGoods = this.data.goodsList.filter((item) => item.count > 0);

    // 创建订单
    const order = {
      id: Date.now(),
      goods: selectedGoods,
      totalPrice: this.data.totalPrice,
      createTime: new Date().toLocaleString(),
    };

    // 保存订单到本地存储
    const orders = wx.getStorageSync("orders") || [];
    orders.unshift(order);
    wx.setStorageSync("orders", orders);

    // 更新用户使用额度
    const userData = wx.getStorageSync("userData") || {};
    userData.usedAmount = (userData.usedAmount || 0) + this.data.totalPrice;
    wx.setStorageSync("userData", userData);

    wx.showToast({
      title: "订单提交成功",
      icon: "success",
      duration: 1500,
      success: () => {
        // 重置商品数量和总价
        const goodsList = this.data.goodsList.map((item) => ({
          ...item,
          count: 0,
        }));

        this.setData({
          goodsList: goodsList,
          totalPrice: 0,
          remainingLimit: this.data.dailyLimit - userData.usedAmount,
        });
      },
    });
  },
});
