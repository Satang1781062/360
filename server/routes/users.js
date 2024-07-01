const express = require("express");
const router = express.Router();

//Controller
const {
  listUsers,
  readUsers,
  updateUsers,
  removeUsers,
  changeStatus,
  changeRole,
  userCart,
  getUserCart,
  saveAddress,
  saveOrder,
  emptyCart,
  addToWishlist,
  getWishlist,
  removeWishlist,
  getOrder
} = require("../controllers/users");

// middleware
const { auth, adminCheck } = require("../middleware/auth");
const Order = require("../models/Order");

//@Endpoint http://localhost:5000/api/users
//@Method GET
//@Access Publish
router.get("/users", auth, adminCheck, listUsers);

//@Endpoint http://localhost:5000/api/users/:id
//@Method GET
//@Access Publish
router.get("/users/:id", readUsers);

//@Endpoint http://localhost:5000/api/users
//@Method GET
//@Access Publish
router.put("/users/:id",auth, adminCheck, updateUsers);

//@Endpoint http://localhost:5000/api/users
//@Method DELETE
//@Access Publis
router.delete("/users/:id", removeUsers);

//@Endpoint http://localhost:5000/api/change-status
//@Method POST
//@Access Private
router.post("/change-status", auth, adminCheck, changeStatus);

//@Endpoint http://localhost:5000/api/change-role
//@Method POST
//@Access Private
router.post("/change-role", auth, adminCheck, changeRole);


//@Endpoint http://localhost:5000/api/user/cart
//@Method POST GET
//@Access Private
router.post("/user/cart", auth, userCart);
router.get("/user/cart", auth, getUserCart);
router.delete("/user/cart", auth, emptyCart);


router.post("/user/address", auth, saveAddress);
//Orde
router.post("/user/order", auth, saveOrder);
router.get("/user/orders", auth, getOrder);

router.post("/user/wishlist", auth, addToWishlist);
router.get("/user/wishlist", auth, getWishlist);
router.put("/user/wishlist/:productId", auth, removeWishlist);




module.exports = router;
