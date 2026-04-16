const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 50 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  avatar: { type: String, default: '' },
  subscription: {
    plan: { type: String, enum: ['free', 'trial', 'basic', 'premium'], default: 'free' },
    startDate: { type: Date },
    endDate: { type: Date },
    isActive: { type: Boolean, default: false },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String }
  },
  usage: {
    aiRequests: { type: Number, default: 0 },
    lastReset: { type: Date, default: Date.now }
  },
  chatHistory: [{
    module: { type: String },
    prompt: { type: String },
    response: { type: String },
    timestamp: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.hasActiveSubscription = function() {
  if (this.subscription.plan === 'free') return false;
  if (!this.subscription.endDate) return false;
  return new Date() < new Date(this.subscription.endDate);
};

module.exports = mongoose.model('User', userSchema);
