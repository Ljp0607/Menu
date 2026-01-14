const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, '请提供用户ID'],
  },
  userName: {
    type: String,
    required: [true, '请提供用户名'],
    trim: true,
  },
  goods: [
    {
      id: {
        type: Number,
        required: [true, '请提供菜品ID'],
      },
      name: {
        type: String,
        required: [true, '请提供菜品名称'],
        trim: true,
      },
      price: {
        type: Number,
        required: [true, '请提供菜品价格'],
        min: [0, '价格不能为负数'],
      },
      count: {
        type: Number,
        required: [true, '请提供菜品数量'],
        min: [1, '数量不能少于1'],
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: [true, '请提供订单总价格'],
    min: [0, '总价格不能为负数'],
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', OrderSchema);
