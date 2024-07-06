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


/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *               count:
 *                 type: integer
 *               price:
 *                 type: number
 *         cartTotal:
 *           type: number
 *           format: double
 *         orderstatus:
 *           type: string
 *         orderdBy:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 */


//@Endpoint http://localhost:5000/api/users
//@Method GET
//@Access Publish
router.get("/users", auth, adminCheck, listUsers);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */



//@Endpoint http://localhost:5000/api/users/:id
//@Method GET
//@Access Publish
router.get("/users/:id", readUsers);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */




//@Endpoint http://localhost:5000/api/users
//@Method GET
//@Access Publish
router.put("/users/:id",auth, adminCheck, updateUsers);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       description: Updated user data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */


//@Endpoint http://localhost:5000/api/users
//@Method DELETE
//@Access Publis
router.delete("/users/:id", removeUsers);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */



//@Endpoint http://localhost:5000/api/change-status
//@Method POST
//@Access Private
router.post("/change-status", auth, adminCheck, changeStatus);
/**
 * @swagger
 * /change-status:
 *   post:
 *     summary: Change user status
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: User status data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               enabled:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User status updated
 *       404:
 *         description: User not found
 */




//@Endpoint http://localhost:5000/api/change-role
//@Method POST
//@Access Private
router.post("/change-role", auth, adminCheck, changeRole);
/**
 * @swagger
 * /change-role:
 *   post:
 *     summary: Change user role
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: User role data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User role updated
 *       404:
 *         description: User not found
 */




//@Endpoint http://localhost:5000/api/user/cart
//@Method POST GET
//@Access Private
router.post("/user/cart", auth, userCart);
/**
 * @swagger
 * /user/cart:
 *   post:
 *     summary: Add items to user cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Cart data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     count:
 *                       type: integer
 *                     price:
 *                       type: number
 *                       format: double
 *     responses:
 *       200:
 *         description: Cart updated
 *       500:
 *         description: Server error
 */



router.get("/user/cart", auth, getUserCart);
/**
 * @swagger
 * /user/cart:
 *   get:
 *     summary: Get user cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User cart data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 cartTotal:
 *                   type: number
 *                   format: double
 *       404:
 *         description: Cart not found
 */




router.delete("/user/cart", auth, emptyCart);
/**
 * @swagger
 * /user/cart:
 *   delete:
 *     summary: Empty user cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart emptied
 *       500:
 *         description: Server error
 */





router.post("/user/address", auth, saveAddress);
/**
 * @swagger
 * /user/address:
 *   post:
 *     summary: Save user address
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Address data
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               address:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   address:
 *                     type: string
 *                   email:
 *                     type: string
 *     responses:
 *       200:
 *         description: Address saved
 *       500:
 *         description: Server error
 */



//Order
router.post("/user/order", auth, saveOrder);
/**
 * @swagger
 * /user/order:
 *   post:
 *     summary: Save user order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Order data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Order saved
 *       500:
 *         description: Server error
 */




router.get("/user/orders", auth, getOrder);
/**
 * @swagger
 * /user/orders:
 *   get:
 *     summary: Get user orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User orders data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */



router.post("/user/wishlist", auth, addToWishlist);
/**
 * @swagger
 * /user/wishlist:
 *   post:
 *     summary: Add to wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Wishlist data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Added to wishlist
 *       500:
 *         description: Server error
 */



router.get("/user/wishlist", auth, getWishlist);
/**
 * @swagger
 * /user/wishlist:
 *   get:
 *     summary: Get wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 wishlist:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */




router.put("/user/wishlist/:productId", auth, removeWishlist);
/**
 * @swagger
 * /user/wishlist/{productId}:
 *   put:
 *     summary: Remove from wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Removed from wishlist
 *       500:
 *         description: Server error
 */



module.exports = router;
