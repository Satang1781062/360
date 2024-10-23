// routes/menuItemRoutes.js
const express = require("express");
const router = express.Router();
const {
    list,
    create,
    read,
    update,
    remove,
    getProduct,
    getSubCategoryProducts,
} = require('../controllers/CategoryMenuItem');
const { auth, adminCheck } = require('../middleware/auth');

/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: Retrieve a list of menu items
 *     tags: [Menu Items]
 *     responses:
 *       200:
 *         description: A list of menu items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuItem'
 *       500:
 *         description: Server Error
 */

router.get('/menu', list);

/**
 * @swagger
 * /api/menu:
 *   post:
 *     summary: Create a new menu item
 *     tags: [Menu Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
 *     responses:
 *       200:
 *         description: The created menu item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       500:
 *         description: Server Error
 */

router.post('/menu', auth, adminCheck, create);

/**
 * @swagger
 * /api/menu/{id}:
 *   get:
 *     summary: Retrieve a menu item by ID
 *     tags: [Menu Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the menu item to retrieve
 *     responses:
 *       200:
 *         description: The menu item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       500:
 *         description: Server Error
 */

router.get('/menu/:id', read);

/**
 * @swagger
 * /api/menu/{id}:
 *   put:
 *     summary: Update a menu item by ID
 *     tags: [Menu Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the menu item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
 *     responses:
 *       200:
 *         description: The updated menu item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       500:
 *         description: Server Error
 */

router.put('/menu/:id', auth, adminCheck, update);

/**
 * @swagger
 * /api/menu/{id}:
 *   delete:
 *     summary: Delete a menu item by ID
 *     tags: [Menu Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the menu item to delete
 *     responses:
 *       200:
 *         description: The deleted menu item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       500:
 *         description: Server Error
 */

router.delete('/menu/:id', auth, adminCheck, remove);

router.get('/menu/product/:id', getProduct);

router.get('/menu/products/:subId', getSubCategoryProducts);

module.exports = router;
