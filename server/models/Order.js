const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true // หมายเลข order ต้องเป็น unique
    },
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'product'
        },
        count: Number,
        price: Number
      }
    ],
    cartTotal: Number,
    orderstatus: {
      type: String,
      default: 'Not Process'
    },
    orderdBy: {
      type: ObjectId,
      ref: 'users'
    },
    images:{
      type: Array
     },
  },
  { timestamps: true }
);

module.exports = Order = mongoose.model("order", OrderSchema);
