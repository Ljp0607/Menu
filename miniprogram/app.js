// app.js
App({
  globalData: {
    // env 参数说明：
    //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
    //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
    //   如不填则使用默认环境（第一个创建的环境）
    env: "",
    // 用户数据
    userData: {
      today: new Date().toDateString(),
      usedAmount: 0,
    },
    // 每日额度
    dailyLimit: 100,
    // 默认商品数据
    defaultGoods: [
      {
        id: 1,
        name: "宫保鸡丁",
        price: 25,
        image: "/images/default-goods-image.png",
        description: "经典川菜，色香味俱全",
      },
      {
        id: 2,
        name: "鱼香肉丝",
        price: 22,
        image: "/images/default-goods-image.png",
        description: "酸甜可口，下饭神器",
      },
      {
        id: 3,
        name: "麻婆豆腐",
        price: 18,
        image: "/images/default-goods-image.png",
        description: "麻辣鲜香，豆腐嫩滑",
      },
      {
        id: 4,
        name: "红烧肉",
        price: 35,
        image: "/images/default-goods-image.png",
        description: "肥而不腻，入口即化",
      },
      {
        id: 5,
        name: "炒青菜",
        price: 12,
        image: "/images/default-goods-image.png",
        description: "清爽可口，健康营养",
      },
      {
        id: 6,
        name: "西红柿炒鸡蛋",
        price: 15,
        image: "/images/default-goods-image.png",
        description: "经典家常菜，老少皆宜",
      },
    ],
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
