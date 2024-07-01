const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    address: {
      name: String,
      phone: String,
      address: String,
      email: String,
    },
    wishlist:[{
      type: ObjectId,
      ref: 'product'
    }]
  },
  { timestamps: true }
);

//"users"คือชื่อใน Collection ของ mongo  หรือชื่อTable
module.exports = User = mongoose.model("users", UserSchema);
