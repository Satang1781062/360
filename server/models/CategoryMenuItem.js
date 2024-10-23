const mongoose = require("mongoose");

const ProductMenuSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        images: {
            type: Array
        },
    },
    { timestamps: true }
);

const SubCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        websiteLink: {  // เพิ่มฟิลด์ลิงก์เว็บไซต์ที่นี่
            type: String,
            required: false, // ตั้งค่า required เป็น false ถ้าลิงก์ไม่จำเป็น
        },
        products: [ProductMenuSchema], // ฟิลด์สำหรับเก็บผลิตภัณฑ์
    },
    { timestamps: true }
);

const CategoryMenuSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        subCategories: [SubCategorySchema], // ฟิลด์สำหรับเก็บรายการย่อย
    },
    { timestamps: true }
);

module.exports = CategoryMenu = mongoose.model("categoryMenu", CategoryMenuSchema);
