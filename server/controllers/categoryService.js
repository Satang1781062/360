const CategoryService = require("../models/categoryss/CatrgoryService");

exports.list = async (req, res) => {
    try {
      const categoryservice = await CategoryService.find({}).exec()
      return res.send(categoryservice); // ส่งการตอบกลับหลังจากดำเนินการเสร็จสิ้น
    } catch (err) {
      return res.status(500).send("Server Error!!"); // ส่งการตอบกลับเมื่อเกิดข้อผิดพลาด
    }
  };
  
  exports.create = async (req, res) => {
    try {
      console.log(req.body)
      const { name } = req.body;
      const categoryservice = await new CategoryService({ name }).save();
  
      // ทำการดำเนินการกับฐานข้อมูลของคุณที่นี่ เช่น การบันทึก category
      // const category = new Category({ name });
      // await category.save();
  
       res.send(categoryservice); // ส่งการตอบกลับหลังจากดำเนินการเสร็จสิ้น
    } catch (err) {
       res.status(500).send("Server Error!!"); // ส่งการตอบกลับเมื่อเกิดข้อผิดพลาด
    }
  };
  
  exports.read = async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id)
      const categoryservice = await CategoryService.findOne({_id:id});
      return res.send(categoryservice); // ส่งการตอบกลับหลังจากดำเนินการเสร็จสิ้น
    } catch (err) {
      return res.status(500).send("Server Error!!"); // ส่งการตอบกลับเมื่อเกิดข้อผิดพลาด
    }
  };
  
  exports.update = async (req, res) => {
      try {
          const id = req.params.id
          const { name } = req.body;
          const categoryservice = await CategoryService.findOneAndUpdate({_id:id}, {name:name});
          return res.send(categoryservice); // ส่งการตอบกลับหลังจากดำเนินการเสร็จสิ้น
        } catch (err) {
          return res.status(500).send("Server Error!!"); // ส่งการตอบกลับเมื่อเกิดข้อผิดพลาด
        }
  };
  
  exports.remove = async (req, res) => {
      try {
          const id = req.params.id
          const categoryservice = await CategoryService.findOneAndDelete({_id:id})
          return res.send(categoryservice); // ส่งการตอบกลับหลังจากดำเนินการเสร็จสิ้น
        } catch (err) {
          return res.status(500).send("Server Error!!"); // ส่งการตอบกลับเมื่อเกิดข้อผิดพลาด
        }
  };