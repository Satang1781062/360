const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      text: true
    },
    description: {
      type: String
    },
    category: [{  // เปลี่ยนจาก ObjectId เดี่ยวเป็น Array ของ ObjectId
      type: ObjectId,
      ref: "category",
    }],
    price: {
      type: Number
    },
    discountedPrice: {  // เพิ่ม field นี้
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    quantity: {
      type: Number
    },
    images: {
      type: Array
    },
  },
  { timestamps: true }
);

module.exports = ProductService = mongoose.model("productservice", ProductServiceSchema);
