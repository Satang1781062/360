const express = require("express");
const router = express.Router();

// controller
const { create, list, remove, read, update, listBy, searchFilters } = require('../controllers/product');

// middleware
const { auth, adminCheck } = require('../middleware/auth');



// ดึงรายการสินค้าตามจำนวนที่ระบุ
router.get('/product/:count', list);
/**
 * @swagger
 * /api/product/{count}:
 *   get:
 *     summary: ดึงรายการสินค้า
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: count
 *         schema:
 *           type: integer
 *         required: true
 *         description: จำนวนสินค้าที่ต้องการดึง
 *     responses:
 *       200:
 *         description: รายการสินค้าที่ดึงมา
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: เกิดข้อผิดพลาดที่เซิร์ฟเวอร์
 */

// อ่านข้อมูลสินค้าตาม ID
router.get("/products/:id", read);
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: อ่านข้อมูลสินค้าตาม ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID ของสินค้า
 *     responses:
 *       200:
 *         description: ข้อมูลสินค้าที่ดึงมา
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: เกิดข้อผิดพลาดที่เซิร์ฟเวอร์
 */

// สร้างสินค้าใหม่
router.post('/product', auth, adminCheck, create);
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: สร้างสินค้าชิ้นใหม่
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: สินค้าที่ถูกสร้าง
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: เกิดข้อผิดพลาดที่เซิร์ฟเวอร์
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - category
 *         - price
 *         - quantity
 *         - images
 *       properties:
 *         title:
 *           type: string
 *           description: The product title
 *         description:
 *           type: string
 *           description: The product description
 *         category:
 *           type: string
 *           description: The category ID
 *         price:
 *           type: number
 *           description: The product price
 *         quantity:
 *           type: number
 *           description: The quantity of the product
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of image URLs
 *         sold:
 *           type: number
 *           description: Number of products sold
 *           default: 0
 *       example:
 *         title: Sample Product
 *         description: This is a sample product
 *         category: 60d0fe4f5311236168a109ca
 *         price: 99.99
 *         quantity: 10
 *         images: ["image1.jpg", "image2.jpg"]
 *         sold: 0
 */

// ลบสินค้า
router.delete('/product/:id', auth, adminCheck, remove);
/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: ลบสินค้าตาม ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID ของสินค้า
 *     responses:
 *       200:
 *         description: ข้อมูลสินค้าที่ถูกลบ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: เกิดข้อผิดพลาดที่เซิร์ฟเวอร์
 */

// อัพเดทสินค้า
router.put("/product/:id", auth, adminCheck, update);
/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: อัพเดทข้อมูลสินค้าตาม ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID ของสินค้า
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: ข้อมูลสินค้าที่ถูกอัพเดท
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: เกิดข้อผิดพลาดที่เซิร์ฟเวอร์
 */

// ดึงสินค้าตามการจัดเรียงและจำกัดจำนวน
router.post("/productby", listBy);
/**
 * @swagger
 * /api/productby:
 *   post:
 *     summary: ดึงสินค้าตามการจัดเรียงและจำกัดจำนวน
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sort:
 *                 type: string
 *                 description: ฟิลด์สำหรับการจัดเรียง
 *               order:
 *                 type: string
 *                 description: ลำดับการจัดเรียง (asc หรือ desc)
 *               limit:
 *                 type: integer
 *                 description: จำนวนสินค้าที่ต้องการดึง
 *     responses:
 *       200:
 *         description: รายการสินค้าที่ดึงมา
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: เกิดข้อผิดพลาดที่เซิร์ฟเวอร์
 */

// ค้นหาสินค้าตามฟิลเตอร์
router.post('/search/filters', searchFilters);
/**
 * @swagger
 * /api/search/filters:
 *   post:
 *     summary: ค้นหาสินค้าตามฟิลเตอร์
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *                 description: คำค้นหา
 *               price:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: ช่วงราคาที่ต้องการค้นหา
 *               category:
 *                 type: string
 *                 description: หมวดหมู่ของสินค้า
 *     responses:
 *       200:
 *         description: รายการสินค้าที่ค้นหาได้
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: เกิดข้อผิดพลาดที่เซิร์ฟเวอร์
 */

module.exports = router;
