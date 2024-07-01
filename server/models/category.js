const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
   
   
    
  },
  { timestamps: true }
);

//"users"คือชื่อใน Collection ของ mongo  หรือชื่อTable
module.exports = Category = mongoose.model("category", CategorySchema);
