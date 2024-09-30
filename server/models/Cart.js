const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'product' // Ensure this matches your Product model name
        },
        productservice: {
          type: ObjectId,
          ref: 'productservice' // Ensure this matches your ProductService model name
        },
        count: Number,
        price: Number
      }
    ],
    cartTotal: Number,
    orderdBy: {
      type: ObjectId,
      ref: 'User' // Ensure this matches your User model name
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("cart", CartSchema);
