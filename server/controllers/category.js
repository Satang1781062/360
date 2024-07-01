const Category = require("../models/category");

exports.list = async (req, res) => {
  try {
    const category = await Category.find({}).exec()
    return res.send(category); // ส่งการตอบกลับหลังจากดำเนินการเสร็จสิ้น
  } catch (err) {
    return res.status(500).send("Server Error!!"); // ส่งการตอบกลับเมื่อเกิดข้อผิดพลาด
  }
};

exports.create = async (req, res) => {
  try {
    console.log(req.body)
    const { name } = req.body;
    const category = await new Category({ name }).save();

    // ทำการดำเนินการกับฐานข้อมูลของคุณที่นี่ เช่น การบันทึก category
    // const category = new Category({ name });
    // await category.save();

     res.send(category); // ส่งการตอบกลับหลังจากดำเนินการเสร็จสิ้น
  } catch (err) {
     res.status(500).send("Server Error!!"); // ส่งการตอบกลับเมื่อเกิดข้อผิดพลาด
  }
};

exports.read = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id)
    const category = await Category.findOne({_id:id});
    return res.send(category); // ส่งการตอบกลับหลังจากดำเนินการเสร็จสิ้น
  } catch (err) {
    return res.status(500).send("Server Error!!"); // ส่งการตอบกลับเมื่อเกิดข้อผิดพลาด
  }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id
        const { name } = req.body;
        const category = await Category.findOneAndUpdate({_id:id}, {name:name});
        return res.send(category); // ส่งการตอบกลับหลังจากดำเนินการเสร็จสิ้น
      } catch (err) {
        return res.status(500).send("Server Error!!"); // ส่งการตอบกลับเมื่อเกิดข้อผิดพลาด
      }
};

exports.remove = async (req, res) => {
    try {
        const id = req.params.id
        const category = await Category.findOneAndDelete({_id:id})
        return res.send(category); // ส่งการตอบกลับหลังจากดำเนินการเสร็จสิ้น
      } catch (err) {
        return res.status(500).send("Server Error!!"); // ส่งการตอบกลับเมื่อเกิดข้อผิดพลาด
      }
};
