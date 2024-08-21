const mongoose = require("mongoose");
const CategoryServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
   
   
    
  },
  { timestamps: true }
);

//"users"คือชื่อใน Collection ของ mongo  หรือชื่อTable
module.exports = CategoryService = mongoose.model("categoryservice", CategoryServiceSchema);