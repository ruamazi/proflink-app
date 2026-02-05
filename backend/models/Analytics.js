const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  link: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Link',
    required: true
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  referrer: {
    type: String
  },
  country: {
    type: String
  }
}, {
  timestamps: true
});

analyticsSchema.index({ user: 1, createdAt: -1 });
analyticsSchema.index({ link: 1, createdAt: -1 });

module.exports = mongoose.model('Analytics', analyticsSchema);