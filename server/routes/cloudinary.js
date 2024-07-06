/**
 * @swagger
 * tags:
 *   name: Cloudinary
 *   description: API endpoints for Cloudinary image management
 */

const express = require("express");
const router = express.Router();

// controller
const { createImage, removeImage } = require('../controllers/cloudinary');

// middleware
const { auth, adminCheck } = require('../middleware/auth');

//@Endpoint http://localhost:5000/api/images
router.post('/images', auth, adminCheck, createImage);
/**
 * @swagger
 * /api/images:
 *   post:
 *     summary: Upload an image to Cloudinary
 *     tags: [Cloudinary]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 description: Base64 encoded image data
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 public_id:
 *                   type: string
 *       500:
 *         description: Server error
 */



router.post('/removeimages', auth, adminCheck, removeImage);
/**
 * @swagger
 * /api/removeimages:
 *   post:
 *     summary: Remove an image from Cloudinary
 *     tags: [Cloudinary]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               public_id:
 *                 type: string
 *                 description: Public ID of the image to remove
 *     responses:
 *       200:
 *         description: Image removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *       500:
 *         description: Server error
 */


router.post('/bill', auth,  createImage);
/**
 * @swagger
 * /api/bill:
 *   post:
 *     summary: Upload a bill image to Cloudinary
 *     tags: [Cloudinary]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 description: Base64 encoded image data
 *     responses:
 *       200:
 *         description: Bill image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 public_id:
 *                   type: string
 *       500:
 *         description: Server error
 */



router.post('/removebill', auth, removeImage);
/**
 * @swagger
 * /api/removebill:
 *   post:
 *     summary: Remove a bill image from Cloudinary
 *     tags: [Cloudinary]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               public_id:
 *                 type: string
 *                 description: Public ID of the bill image to remove
 *     responses:
 *       200:
 *         description: Bill image removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *       500:
 *         description: Server error
 */


module.exports = router;
