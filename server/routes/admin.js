const express = require("express");
const router = express.Router();

// middleware
const { auth, adminCheck } = require("../middleware/auth");

// controllers
const { changeOrderStatus,getOrderAdmin } = require('../controllers/admin')

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - products
 *         - cartTotal
 *         - orderstatus
 *         - orderdBy
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the order
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: The product ID
 *               count:
 *                 type: number
 *                 description: The number of products
 *               price:
 *                 type: number
 *                 description: The price of the product
 *         cartTotal:
 *           type: number
 *           description: The total cost of the cart
 *         orderstatus:
 *           type: string
 *           description: The status of the order
 *           default: 'Not Process'
 *         orderdBy:
 *           type: string
 *           description: The user ID who placed the order
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the order was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the order was last updated
 *       example:
 *         id: 60d0fe4f5311236168a109ca
 *         products: 
 *           - product: 60d0fe4f5311236168a109cb
 *             count: 2
 *             price: 50
 *         cartTotal: 100
 *         orderstatus: 'Not Process'
 *         orderdBy: 60d0fe4f5311236168a109cc
 *         createdAt: 2024-07-06T12:00:00.000Z
 *         updatedAt: 2024-07-06T12:00:00.000Z
 */


//@Endpoint  http://localhost:5000/api/admin/order-status
//@Method    PUT
//@Access    Private
router.put("/admin/order-status", auth, changeOrderStatus);
/**
 * @swagger
 * /api/admin/order-status:
 *   put:
 *     summary: Change the status of an order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - orderstatus
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: The ID of the order
 *               orderstatus:
 *                 type: string
 *                 description: The new status of the order
 *             example:
 *               orderId: 60d0fe4f5311236168a109ca
 *               orderstatus: "Processing"
 *     responses:
 *       200:
 *         description: The updated order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Update Status Error
 */


router.get("/admin/orders", auth, getOrderAdmin);

/**
 * @swagger
 * /api/admin/orders:
 *   get:
 *     summary: Retrieve a list of orders for the admin
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: get Order Error
 */



module.exports = router;
