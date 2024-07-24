const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    discount: {
      type: Number,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product'
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Promotion', PromotionSchema);
