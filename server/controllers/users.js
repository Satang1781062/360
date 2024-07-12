const bcrypt = require("bcryptjs");
const fs = require('fs');
const path = require('path');
//Model
const User = require("../models/User");
const Product = require("../models/Product")
const Cart = require('../models/Cart')
const Order = require('../models/Order')
const jwt = require("jsonwebtoken");
// const { use } = require("../routes/api");

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'natthasit.muka@gmail.com',
    pass: 'nfhr zmmo fdeq mxno',
  },
});

const getOrderEmailNumber = async () => {
  const filePath = path.join(__dirname, 'orderNumber.txt');
  const orderEmailNumber = parseInt(fs.readFileSync(filePath, 'utf-8'), 10);
  const newOrderEmailNumber = orderEmailNumber + 1;
  fs.writeFileSync(filePath, newOrderEmailNumber.toString(), 'utf-8');
  return orderEmailNumber;
};

exports.listUsers = async (req, res) => {
  try {
   //code
   const user = await User.find({}).select('-password').exec();
   res.send(user)
   


  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
exports.readUsers = async (req, res) => {
  try {
   //code
   const id = req.params.id
   const user = await User.findOne({_id:id}).select('-password').exec();
   res.send(user)


  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
exports.updateUsers = async (req, res) => {
  try {
    // Code
    var {id, password} = req.body.values
    // 1 gen salt
    const salt = await bcrypt.genSalt(10);
    // 2 encrypt
    var enPassword = await bcrypt.hash(password, salt);

    const user = await User.findOneAndUpdate(
      { _id: id },
      { password: enPassword }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
exports.removeUsers = async (req, res) => {
  try {
   //code
   const id = req.params.id;
   const user = await User.findOneAndDelete({_id: id });
   res.send(user);


  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
exports.changeStatus = async (req, res) => {
  try {
   //code
   console.log(req.body)
   const user = await User.findOneAndUpdate({_id: req.body.id },{enabled:req.body.enabled});
   res.send(user);


  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
exports.changeRole = async (req, res) => {
  try {
   //code
   console.log(req.body)
   const user = await User.findOneAndUpdate({_id: req.body.id },{role:req.body.role});
   res.send(user);


  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};


exports.userCart = async (req, res) => {
  try {
    const { cart } = req.body;
    console.log("Received cart:", cart); // Logging เพิ่มเติม

    // Check User
    let user = await User.findOne({ username: req.user.username }).exec();
    if (!user) {
      return res.status(400).send('User not found');
    }

    // สร้าง array ของสินค้า
    let products = [];

    // ลบตะกร้าเก่าหากมี
    let cartOld = await Cart.findOne({ orderdBy: user._id }).exec();
    if (cartOld) {
      await Cart.deleteOne({ orderdBy: user._id }); // ใช้ deleteOne ที่นี่
      console.log('Removed old cart');
    }

    // เติมสินค้าลงใน array
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.price = cart[i].price;
      products.push(object);
    }

    // คำนวณยอดรวมของตะกร้า
    let cartTotal = products.reduce((total, item) => total + item.price * item.count, 0);

    // สร้างตะกร้าใหม่
    let newCart = await new Cart({
      products,
      cartTotal,
      orderdBy: user._id,
    }).save();

    console.log('ตะกร้าใหม่:', newCart);
    res.send('userCart OK');
  } catch (err) {
    console.log(err);
    res.status(500).send('userCart Server Error');
  }
};



exports.getUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();
    if (!user) {
      return res.status(400).send('User not found');
    }

    let cart = await Cart.findOne({ orderdBy: user._id })
      .populate('products.product', "_id title price")
      .exec();

    if (!cart) {
      return res.status(400).send('Cart not found');
    }

    const { products, cartTotal } = cart;
    console.log('Fetched cart:', products, cartTotal); // Logging เพิ่มเติม
    res.json({ products, cartTotal });
  } catch (err) {
    console.log(err);
    res.status(500).send('getUserCart Error');
  }
};



exports.saveAddress = async (req, res) => {
  try {
    const { name, phone, address, email } = req.body.address;
    console.log("Received address data:", { name, phone, address, email }); // Add this line for logging
    const userAddress = await User.findOneAndUpdate(
      { username: req.user.username },
      { address: { name, phone, address, email } }
    ).exec();
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).send('save address Error');
  }
};

exports.saveOrder = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.user.username }).exec();
    let userCart = await Cart.findOne({ orderdBy: user._id }).exec();
    let images = req.body.images;

    // Generate unique order number
    let orderNumber = generateOrderNumber();

    let order = await new Order({
      orderNumber,
      products: userCart.products,
      orderdBy: user._id,
      cartTotal: userCart.cartTotal,
      images: images,
    }).save();

    const orderEmailNumber = await getOrderEmailNumber();
    // Send order confirmation email
    await transporter.sendMail({
      from: 'natthasit.muka@gmail.com',
      to: 'natthasit.project@gmail.com', // Replace with admin's email
      subject: `New Order Placed ${orderEmailNumber}`,
      html: `<p>Order Number: ${order.orderNumber}</p>
      <p>For more details, visit <a href="https://360-healthyshop.netlify.app/">360 Healthy Shop</a>.</p>
      `,
    });

    // Remove purchased products from inventory
    let bulkOption = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });

    await Product.bulkWrite(bulkOption, {});

    // Remove user's cart after checkout
    await Cart.findOneAndDelete({ orderdBy: user._id }).exec();

    res.status(200).json({ order});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not save order' });
  }
};

// Function to send order confirmation email


// Function to generate unique order number
const generateOrderNumber = () => {
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};
exports.getOrder= async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    let order = await Order.find({ orderdBy: user._id })
      .populate('products.product')
      .exec();

    // กรองสินค้าที่ถูกลบออกไป
    order = order.map(o => {
      o.products = o.products.filter(p => p.product !== null);
      return o;
    });

    res.json(order)
  } catch (err) {
    console.log(err);
    res.status(500).send('get Order Error');
  }
};


exports.emptyCart = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();
    
    const empty = await Cart.findOneAndDelete({orderdBy:user._id}).exec()

    res.send(empty)

   
  } catch (err) {
    console.log(err);
    res.status(500).send('Remove Cart Error');
  }
};

exports.addToWishlist = async(req,res)=>{
  try{
    const {productId} = req.body
    let user = await User.findOneAndUpdate(
      {username:req.user.username},
      {$addToSet:{wishlist:productId}}
    ).exec()
    res.send(user)
  }catch(err){
    res.status(500).send('Add Wishlist Error')
  }
}

exports.getWishlist = async(req,res)=>{
  try{
    let list = await User.findOne({username:req.user.username})
    .select('wishlist')
    .populate('wishlist')
    .exec()

    res.json(list)
  }catch(err){
    res.status(500).send('Get Wishlist Error')
  }
}

exports.removeWishlist = async(req,res)=>{
  try{
    const {productId} = req.params
    let user = await User.findOneAndUpdate(
      {username:req.user.username},
      {$pull:{wishlist: productId}}
    ).exec()
    res.send(user)
  }catch(err){
    res.status(500).send('Get Wishlist Error')
  }
}