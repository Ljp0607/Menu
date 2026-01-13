// pages/goods/index.js
Page({
  data: {
    goodsList: [
      {
        id: 1,
        name: "老火煨山笋",
        price: 36,
        image: "/images/names/1.jpg",
        shortDescription: "鲜香可口，笋肉嫩脆",
        description:
          "鲜香可口，笋肉嫩脆，汤汁浓郁。选用新鲜山笋，慢火炖煮数小时，吸收了鸡汤的精华，口感鲜嫩多汁，营养丰富，是春日养生的绝佳选择。",
        count: 0,
      },
      {
        id: 2,
        name: "有喜江西三杯鸡",
        price: 42,
        image: "/images/names/2.jpg",
        shortDescription: "经典江西名菜，色泽红亮",
        description:
          "经典江西名菜，色泽红亮，鸡肉鲜嫩。采用传统三杯工艺（一杯酒、一杯酱油、一杯油）烹饪，鸡肉入味透彻，香气四溢，口感醇厚，让人回味无穷。",
        count: 0,
      },
      {
        id: 3,
        name: "赣南风味辣椒炒肉",
        price: 38,
        image: "/images/names/3.jpg",
        shortDescription: "赣南特色，辣椒香爽",
        description:
          "赣南特色，辣椒香爽，肉片嫩滑。精选本地辣椒和新鲜猪肉，大火快炒，辣椒的香而不辣与肉片的嫩滑完美结合，是下饭的绝佳搭档，百吃不厌。",
        count: 0,
      },
      {
        id: 4,
        name: "江西小炒鸡杂",
        price: 39,
        image: "/images/names/4.jpg",
        shortDescription: "香辣开胃，鸡杂脆爽",
        description:
          "香辣开胃，鸡杂脆爽，下酒下饭。选用新鲜鸡杂，搭配小米椒和芹菜，大火快炒，口感脆嫩，辣味十足，是聚会喝酒的必点菜品，让人越吃越上瘾。",
        count: 0,
      },
      {
        id: 5,
        name: "粉蒸肉",
        price: 45,
        image: "/images/names/5.jpg",
        shortDescription: "肉质酥烂，米粉鲜香",
        description:
          "肉质酥烂，米粉鲜香，肥而不腻。精选五花肉，搭配自制米粉，上笼蒸制而成，肉香与米粉的香气融合，口感软糯，入口即化，是传统名菜的经典之作。",
        count: 0,
      },
      {
        id: 6,
        name: "蒜蓉粉丝焗虾",
        price: 52,
        image: "/images/names/6.jpg",
        shortDescription: "蒜蓉浓郁，粉丝入味",
        description:
          "蒜蓉浓郁，粉丝吸收虾汁，鲜嫩美味。选用新鲜大明虾，搭配蒜蓉和粉丝，高温焗制，虾肉鲜嫩Q弹，粉丝吸收了虾的鲜甜和蒜蓉的香气，让人欲罢不能。",
        count: 0,
      },
      {
        id: 7,
        name: "葱油墨鱼头",
        price: 59,
        image: "/images/names/7.jpg",
        shortDescription: "葱油香气扑鼻，墨鱼头脆嫩",
        description:
          "葱油香气扑鼻，墨鱼头脆嫩多汁。选用新鲜墨鱼头，搭配大量葱花和特制调料，高温烹制，墨鱼头脆嫩爽口，葱油香气浓郁，是海鲜爱好者的最爱。",
        count: 0,
      },
      {
        id: 8,
        name: "香辣小鱼小虾",
        price: 43,
        image: "/images/names/8.jpg",
        shortDescription: "香辣开胃，酥脆可口",
        description:
          "香辣开胃，小鱼小虾酥脆可口。选用新鲜小鱼小虾，经过油炸后再用辣椒爆炒，口感酥脆，香辣过瘾，是下酒的绝佳选择，让人停不下嘴。",
        count: 0,
      },
      {
        id: 9,
        name: "橘子皮炒鲜牛肉",
        price: 48,
        image: "/images/names/9.jpg",
        shortDescription: "橘子皮香气独特，牛肉嫩滑",
        description:
          "橘子皮香气独特，牛肉嫩滑入味。选用新鲜牛肉和橘子皮，大火快炒，牛肉嫩滑多汁，橘子皮的香气清新解腻，口感层次丰富，是创意与传统结合的美味佳肴。",
        count: 0,
      },
      {
        id: 10,
        name: "江西辣鸡爪",
        price: 59,
        image: "/images/names/10.jpg",
        shortDescription: "香辣过瘾，软糯脱骨",
        description:
          "香辣过瘾，鸡爪软糯脱骨。选用新鲜鸡爪，经过卤制后再用辣椒炒制，口感软糯脱骨，辣味十足，是追剧零食和下酒菜品的完美结合，让人越吃越香。",
        count: 0,
      },
      {
        id: 11,
        name: "萍乡莲花血鸭",
        price: 68,
        image: "/images/names/11.jpg",
        shortDescription: "萍乡传统名菜，风味独特",
        description:
          "萍乡传统名菜，鸭肉鲜嫩，风味独特。选用本地麻鸭，搭配鸭血和特制调料，烹饪过程中鸭血融入鸭肉，口感鲜嫩，风味浓郁，是江西菜中的经典代表，值得一试。",
        count: 0,
      },
      {
        id: 12,
        name: "排队王蟹脚捞粉",
        price: 56,
        image: "/images/names/12.jpg",
        shortDescription: "蟹脚鲜美，粉条入味",
        description:
          "蟹脚鲜美，粉条入味，人气爆款。选用新鲜蟹脚，搭配粉丝和特制调料，蟹脚的鲜美融入粉丝中，口感丰富，味道醇厚，是店内的人气菜品，排队也要吃。",
        count: 0,
      },
      {
        id: 13,
        name: "南昌炒米粉",
        price: 28,
        image: "/images/names/13.jpg",
        shortDescription: "南昌特色，米粉爽滑",
        description:
          "南昌特色，米粉爽滑，香辣可口。选用南昌本地米粉，搭配猪肉末、青菜和特制调料，大火快炒，米粉爽滑入味，辣度适中，是南昌人最爱的早餐和宵夜选择。",
        count: 0,
      },
      {
        id: 14,
        name: "南昌油浸黄鱼",
        price: 58,
        image: "/images/names/14.jpg",
        shortDescription: "黄鱼鲜嫩，油脂丰富",
        description:
          "黄鱼鲜嫩，油脂丰富，味道醇厚。选用新鲜黄鱼，经过油炸后再用调料焖制，鱼肉鲜嫩多汁，油脂丰富，味道醇厚，是南昌传统名菜，深受食客喜爱。",
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