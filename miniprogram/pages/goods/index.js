// pages/goods/index.js
Page({
  data: {
    goodsList: [
      {
        id: 1,
        name: "宫保鸡丁",
        price: 25,
        image: "/images/default-goods-image.png",
        description:
          "经典川菜，色香味俱全，选用上等鸡胸肉，搭配花生米、干辣椒等食材，经过精心烹饪而成，口感丰富，麻辣鲜香。",
        count: 0,
      },
      {
        id: 2,
        name: "鱼香肉丝",
        price: 22,
        image: "/images/default-goods-image.png",
        description:
          "酸甜可口，下饭神器，以猪肉丝为主料，配以胡萝卜、青椒等蔬菜，加入特制鱼香调料，口感层次分明，味道浓郁。",
        count: 0,
      },
      {
        id: 3,
        name: "麻婆豆腐",
        price: 18,
        image: "/images/default-goods-image.png",
        description:
          "麻辣鲜香，豆腐嫩滑，选用嫩豆腐，搭配牛肉末、豆瓣酱等调料，经过大火炒制，豆腐吸收了调料的味道，麻辣适中，口感丰富。",
        count: 0,
      },
      {
        id: 4,
        name: "红烧肉",
        price: 35,
        image: "/images/default-goods-image.png",
        description:
          "肥而不腻，入口即化，选用上等五花肉，经过焯水、煸炒、炖煮等多道工序，加入酱油、冰糖等调料，肉质酥烂，味道香甜。",
        count: 0,
      },
      {
        id: 5,
        name: "炒青菜",
        price: 12,
        image: "/images/default-goods-image.png",
        description:
          "清爽可口，健康营养，选用新鲜青菜，经过快速炒制，保留了青菜的营养成分和清脆口感，简单美味。",
        count: 0,
      },
      {
        id: 6,
        name: "西红柿炒鸡蛋",
        price: 15,
        image: "/images/default-goods-image.png",
        description:
          "经典家常菜，老少皆宜，选用新鲜西红柿和鸡蛋，经过炒制，西红柿的酸甜和鸡蛋的嫩滑完美结合，口感丰富。",
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
    const isLoggedIn = wx.getStorageSync('isLoggedIn');
    if (!isLoggedIn) {
      wx.redirectTo({
        url: '/pages/login/index'
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