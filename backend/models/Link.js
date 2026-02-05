const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: 100
  },
  url: {
    type: String,
    required: [true, 'Please provide a URL'],
    trim: true
  },
  icon: {
    type: String,
    default: 'link'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  startDate: {
    type: Date,
    default: null
  },
  endDate: {
    type: Date,
    default: null
  },
  clicks: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Virtual to check if link is currently scheduled to be visible
linkSchema.virtual('isScheduledVisible').get(function() {
  const now = new Date();
  if (this.startDate && now < this.startDate) return false;
  if (this.endDate && now > this.endDate) return false;
  return true;
});

linkSchema.index({ user: 1, order: 1 });

module.exports = mongoose.model('Link', linkSchema);