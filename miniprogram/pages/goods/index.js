// pages/goods/index.js
Page({
  data: {
    goodsList: [
      {
        id: 1,
        name: "老火煨山笋",
        price: 36,
        image: "/images/names/1.jpg",
        description: "鲜香可口，笋肉嫩脆，汤汁浓郁",
        count: 0,
      },
      {
        id: 2,
        name: "有喜江西三杯鸡",
        price: 42,
        image: "/images/names/2.jpg",
        description: "经典江西名菜，色泽红亮，鸡肉鲜嫩",
        count: 0,
      },
      {
        id: 3,
        name: "赣南风味辣椒炒肉",
        price: 38,
        image: "/images/names/3.jpg",
        description: "赣南特色，辣椒香爽，肉片嫩滑",
        count: 0,
      },
      {
        id: 4,
        name: "江西小炒鸡杂",
        price: 39,
        image: "/images/names/4.jpg",
        description: "香辣开胃，鸡杂脆爽，下酒下饭",
        count: 0,
      },
      {
        id: 5,
        name: "粉蒸肉",
        price: 45,
        image: "/images/names/5.jpg",
        description: "肉质酥烂，米粉鲜香，肥而不腻",
        count: 0,
      },
      {
        id: 6,
        name: "蒜蓉粉丝焗虾",
        price: 52,
        image: "/images/names/6.jpg",
        description: "蒜蓉浓郁，粉丝吸收虾汁，鲜嫩美味",
        count: 0,
      },
      {
        id: 7,
        name: "葱油墨鱼头",
        price: 59,
        image: "/images/names/7.jpg",
        description: "葱油香气扑鼻，墨鱼头脆嫩多汁",
        count: 0,
      },
      {
        id: 8,
        name: "香辣小鱼小虾",
        price: 43,
        image: "/images/names/8.jpg",
        description: "香辣开胃，小鱼小虾酥脆可口",
        count: 0,
      },
      {
        id: 9,
        name: "橘子皮炒鲜牛肉",
        price: 48,
        image: "/images/names/9.jpg",
        description: "橘子皮香气独特，牛肉嫩滑入味",
        count: 0,
      },
      {
        id: 10,
        name: "江西辣鸡爪",
        price: 59,
        image: "/images/names/10.jpg",
        description: "香辣过瘾，鸡爪软糯脱骨",
        count: 0,
      },
      {
        id: 11,
        name: "萍乡莲花血鸭",
        price: 68,
        image: "/images/names/11.jpg",
        description: "萍乡传统名菜，鸭肉鲜嫩，风味独特",
        count: 0,
      },
      {
        id: 12,
        name: "排队王蟹脚捞粉",
        price: 56,
        image: "/images/names/12.jpg",
        description: "蟹脚鲜美，粉条入味，人气爆款",
        count: 0,
      },
      {
        id: 13,
        name: "南昌炒米粉",
        price: 28,
        image: "/images/names/13.jpg",
        description: "南昌特色，米粉嫩滑，香辣可口",
        count: 0,
      },
      {
        id: 14,
        name: "南昌油浸黄鱼",
        price: 58,
        image: "/images/names/14.jpg",
        description: "黄鱼鲜嫩，油脂丰富，味道醇厚",
        count: 0,
      },
    ],
    totalPrice: 0,
    dailyLimit: 100,
    remainingLimit: 100,
    showDetail: false,
    selectedGoods: null,
    selectedIndex: -1,
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

  // 更新商品数量
  updateGoodsCount(index, change) {
    const goods = this.data.goodsList[index];
    const newCount = Math.max(0, goods.count + change);
    const priceChange = (newCount - goods.count) * goods.price;
    const newTotalPrice = this.data.totalPrice + priceChange;

    if (newTotalPrice > this.data.dailyLimit && change > 0) {
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

    // 如果当前显示详情弹窗，同步更新弹窗中的商品数量
    if (this.data.showDetail && this.data.selectedIndex === index) {
      this.setData({
        selectedGoods: goodsList[index],
      });
    }
  },

  // 增加商品数量
  addGoods(e) {
    const index = e.currentTarget.dataset.index;
    this.updateGoodsCount(index, 1);
  },

  // 减少商品数量
  reduceGoods(e) {
    const index = e.currentTarget.dataset.index;
    this.updateGoodsCount(index, -1);
  },

  // 显示商品详情
  showGoodsDetail(e) {
    const index = e.currentTarget.dataset.index;
    const goods = this.data.goodsList[index];
    this.setData({
      showDetail: true,
      selectedGoods: goods,
      selectedIndex: index,
    });
  },

  // 关闭商品详情
  closeGoodsDetail() {
    this.setData({
      showDetail: false,
      selectedGoods: null,
      selectedIndex: -1,
    });
  },

  // 在详情弹窗中增加商品数量
  addGoodsInDetail() {
    if (this.data.selectedIndex !== -1) {
      this.updateGoodsCount(this.data.selectedIndex, 1);
    }
  },

  // 在详情弹窗中减少商品数量
  reduceGoodsInDetail() {
    if (this.data.selectedIndex !== -1) {
      this.updateGoodsCount(this.data.selectedIndex, -1);
    }
  },

  // 加入购物车
  addGoodsToCart() {
    this.closeGoodsDetail();
    wx.showToast({
      title: "已加入购物车",
      icon: "success",
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