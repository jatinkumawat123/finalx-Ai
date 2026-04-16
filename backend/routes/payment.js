const express = require('express');
const { protect } = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

const PLANS = {
  basic: { amount: 200, currency: 'INR', days: 2, name: '2-Day Plan' },
  premium: { amount: 900, currency: 'INR', days: 30, name: 'Monthly Premium' }
};

// Create order
router.post('/create-order', protect, async (req, res) => {
  try {
    const { plan } = req.body;
    if (!PLANS[plan]) return res.status(400).json({ message: 'Invalid plan' });

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      // Demo mode
      return res.json({
        demo: true,
        orderId: 'demo_order_' + Date.now(),
        amount: PLANS[plan].amount,
        currency: PLANS[plan].currency,
        plan,
        key: 'demo_key'
      });
    }

    const Razorpay = require('razorpay');
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const order = await razorpay.orders.create({
      amount: PLANS[plan].amount * 100,
      currency: PLANS[plan].currency,
      receipt: `receipt_${req.user._id}_${Date.now()}`
    });

    res.json({
      orderId: order.id,
      amount: PLANS[plan].amount,
      currency: PLANS[plan].currency,
      plan,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (err) {
    res.status(500).json({ message: 'Payment service error' });
  }
});

// Verify payment
router.post('/verify', protect, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = req.body;

    if (!PLANS[plan]) return res.status(400).json({ message: 'Invalid plan' });

    // In production: verify signature using crypto
    // const crypto = require('crypto');
    // const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    // hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    // const generated = hmac.digest('hex');
    // if (generated !== razorpay_signature) return res.status(400).json({ message: 'Invalid signature' });

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + PLANS[plan].days);

    await User.findByIdAndUpdate(req.user._id, {
      subscription: {
        plan,
        startDate: new Date(),
        endDate,
        isActive: true,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id
      }
    });

    res.json({ message: 'Payment successful', plan, endDate });
  } catch (err) {
    res.status(500).json({ message: 'Verification error' });
  }
});

// Get plans
router.get('/plans', (req, res) => {
  res.json({ plans: PLANS });
});

module.exports = router;
