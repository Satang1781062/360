// controllers/menuItemController.js
const CategoryMenu = require("../models/CategoryMenuItem");

exports.list = async (req, res) => {
    try {
        const menuItems = await CategoryMenu.find({});
        return res.send(menuItems);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server Error!!");
    }
};

exports.create = async (req, res) => {
    try {
        console.log("Received data:", req.body); // เพิ่มบรรทัดนี้เพื่อดูข้อมูลที่รับ
        const { name, subCategories } = req.body; // รับค่าจาก request body
        if (!name) {
            return res.status(400).send("Name is required");
        }
        // สร้างหมวดหมู่ใหม่ด้วยข้อมูลที่ได้รับ
        const menuItem = await new CategoryMenu({ name, subCategories }).save(); // ใช้ subCategories แทน
        return res.send(menuItem);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server Error!!");
    }
};

exports.read = async (req, res) => {
    try {
        const id = req.params.id; // ดึง ID จากพารามิเตอร์
        const menuItem = await CategoryMenu.findById(id); // ดึงข้อมูลตาม ID

        if (!menuItem) {
            return res.status(404).send("Menu item not found");
        }

        return res.send(menuItem); // ส่งข้อมูลที่ดึงมา
    } catch (err) {
        console.error("Error fetching menu item:", err); // บันทึกข้อผิดพลาด
        return res.status(500).send("Internal Server Error");
    }
};



exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, subCategories } = req.body; // รับ subCategories และ products
        if (!name) {
            return res.status(400).send("Name is required");
        }
        const menuItem = await CategoryMenu.findByIdAndUpdate(
            id,
            { name, subCategories }, // อัปเดตทั้ง name และ subCategories
            { new: true }
        );
        return res.send(menuItem);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server Error!!");
    }
};

exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const menuItem = await CategoryMenu.findByIdAndDelete(id);
        return res.send(menuItem);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server Error!!");
    }
};

exports.getProduct = async (req, res) => {
    try {
        const id = req.params.id; // ดึง ID ของผลิตภัณฑ์จาก URL
        const category = await CategoryMenu.findOne({ "subCategories.products._id": id }, { "subCategories.$": 1 }); // ค้นหาหมวดหมู่ที่มีผลิตภัณฑ์นั้น

        if (!category) {
            return res.status(404).send("Product not found");
        }

        const product = category.subCategories[0].products.find(p => p._id.toString() === id); // ค้นหาผลิตภัณฑ์ในหมวดหมู่ย่อย

        return res.send(product); // ส่งรายละเอียดผลิตภัณฑ์
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server Error!!");
    }
};

exports.getSubCategoryProducts = async (req, res) => {
    try {
        const subId = req.params.subId; // Get the subCategory ID from the URL
        const category = await CategoryMenu.findOne({ "subCategories._id": subId }, { "subCategories.$": 1 }); // Find the category containing the subCategory

        if (!category) {
            return res.status(404).send("SubCategory not found");
        }

        const subCategory = category.subCategories[0]; // Get the subCategory
        return res.send(subCategory); // Send the subCategory which includes products
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server Error!!");
    }
};