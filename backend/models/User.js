const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '请提供用户名'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, '请提供密码'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 密码加密中间件
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 密码比较方法
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
