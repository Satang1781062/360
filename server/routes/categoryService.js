const express = require("express");
const router = express.Router();

// controller
const {list,create,read,update,remove} = require('../controllers/categoryService')

// middleware
const { auth, adminCheck } = require('../middleware/auth')


/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the category
 *         name:
 *           type: string
 *           description: The name of the category
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the category was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the category was last updated
 *       example:
 *         id: 60d0fe4f5311236168a109ca
 *         name: Electronics
 *         createdAt: 2024-07-06T12:00:00.000Z
 *         updatedAt: 2024-07-06T12:00:00.000Z
 */

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Retrieve a list of categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server Error
 */

//@Endpoint http://localhost:5000/api/category
router.get('/categoryservice',list)


//@Endpoint http://localhost:5000/api/category
router.post('/categoryservice',auth, adminCheck,create)
/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: The created category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server Error
 */


//@Endpoint http://localhost:5000/api/category
router.get('/categoryservice/:id',auth, adminCheck,read)
/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Retrieve a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to retrieve
 *     responses:
 *       200:
 *         description: The category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server Error
 */



//@Endpoint http://localhost:5000/api/category
router.put('/categoryservice/:id',auth, adminCheck,update)
/**
 * @swagger
 * /api/category/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: The updated category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server Error
 */



//@Endpoint http://localhost:5000/api/category
router.delete('/categoryservice/:id',auth, adminCheck,remove)
/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to delete
 *     responses:
 *       200:
 *         description: The deleted category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server Error
 */
    
module.exports = router;