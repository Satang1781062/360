const { query } = require("express");
const ProductServict = require("../models/ProductService");
// const Promotion = require("../models/Promotion");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    const product = await new ProductServict({
      ...req.body,
      category: req.body.category,  // ตรวจสอบว่าค่า category ถูกส่งและบันทึก
    }).save();

    res.send(product); 
  } catch (err) {
    res.status(500).send("Create Product Error!!"); 
  }
};
exports.list = async (req, res) => {
  try {
    // console.log(req.body)
    // const { name } = req.body;
    const count = parseInt(req.params.count);
    console.log(count);
    const product = await ProductServict.find()
      .limit(count)
      .populate("category")
      .sort([["create", "desc"]]);

    res.send(product); 
  } catch (err) {
    res.status(500).send("list Product  Error!!"); 
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await ProductServict.findOneAndDelete({
      _id: req.params.id,
    }).exec();
    res.send(deleted);
  } catch (err) {
    res.status(500).send("Remove Product  Error!!"); // ส่งการตอบกลับเมื่อเกิดข้อผิดพลาด
  }
};

exports.read = async (req, res) => {
  try {
    const product = await ProductServict.findOne({ _id: req.params.id })
      .populate("category")
      .exec();

    res.send(product);
  } catch (err) {
    return res.status(500).send("Server Error!!"); // ส่งการตอบกลับเมื่อเกิดข้อผิดพลาด
  }
};

exports.update = async (req, res) => {
  try {
    const product = await ProductServict.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.send(product);
  } catch (err) {
    return res.status(500).send("Server Error!!"); // ส่งการตอบกลับเมื่อเกิดข้อผิดพลาด
  }
};

//สินค้าขานดี
exports.listBy = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;

    const product = await Product.find()
      .limit(limit)
      .populate("category")
      .sort([[sort, order]]);

    res.send(product); // ส่งการตอบกลับหลังจากดำเนินการเสร็จสิ้น
  } catch (err) {
    res.status(500).send("listBy Product  Error!!"); // ส่งการตอบกลับเมื่อเกิดข้อผิดพลาด
  }
};

const handleQuery = async (req, res, query) => {
  let products = await Product.find({ $text: { $search: query } })
  .populate("category","_id name")
  res.send(products);
};

const handlePrice = async (req, res, price) => {
  let products = await Product.find({
    price:{
      $gte:price[0],
      $lte:price[1]
    }
  })
  .populate("category","_id name")
  res.send(products);
};

const handleCategory = async (req, res, category) => {
  let products = await Product.find({category})
  .populate("category","_id name")
  res.send(products);
};

exports.searchFilters = async (req, res) => {
  const { query,price, category} = req.body;
  
  if (query) {
    console.log("query", query);
    await handleQuery(req,res,query);
  }
  
  // pirce[0,200]
  if (price !== undefined) {
    console.log("--price--->", price);
    await handlePrice(req,res,price);
  }
  // [_id,_id]
  if (category) {
    console.log("category", category);
    await handleCategory(req,res,category);
  }

};



