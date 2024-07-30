const express = require("express");
const router = express.Router();

//Controller
const {register,login,listUser,editUser,deleteUser,currentUser,googleLogin, loginFacebook} = require ('../controllers/auth')


// middleware
const { auth,adminCheck } = require('../middleware/auth')

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         role:
 *           type: string
 *           description: The role of the user
 *           default: "user"
 *         enabled:
 *           type: boolean
 *           description: Whether the user is enabled
 *           default: true
 *         address:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             phone:
 *               type: string
 *             address:
 *               type: string
 *             email:
 *               type: string
 *         wishlist:
 *           type: array
 *           items:
 *             type: string
 *             description: The ID of the product
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user was last updated
 *       example:
 *         id: 60d0fe4f5311236168a109ca
 *         username: johndoe
 *         password: securepassword
 *         role: "user"
 *         enabled: true
 *         address:
 *           name: John Doe
 *           phone: "123-456-7890"
 *           address: "123 Main St"
 *           email: "johndoe@example.com"
 *         wishlist:
 *           - 60d0fe4f5311236168a109cb
 *         createdAt: 2024-07-06T12:00:00.000Z
 *         updatedAt: 2024-07-06T12:00:00.000Z
 */



//@Endpoint http://localhost:3000/api/register
//@Method POST
//@Access Publish
router.post('/register',register)
/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: johndoe
 *               password: securepassword
 *     responses:
 *       200:
 *         description: Registration successful
 *       400:
 *         description: User already exists
 *       500:
 *         description: Server error
 */



//@Endpoint http://localhost:3000/api/login
//@Method POST
//@Access Publish
router.post('/login',login)
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: johndoe
 *               password: securepassword
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: User not found or password invalid
 *       500:
 *         description: Server error
 */



//@Endpoint http://localhost:3000/api/current-user
//@Method POST
//@Access Private
router.post('/current-user', auth, currentUser)
/**
 * @swagger
 * /api/current-user:
 *   post:
 *     summary: Get the current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user data
 *       500:
 *         description: Server error
 */



//@Endpoint http://localhost:3000/api/current-admin
//@Method POST
//@Access Private
router.post('/current-admin', auth, adminCheck, currentUser)
/**
 * @swagger
 * /api/current-admin:
 *   post:
 *     summary: Get the current admin
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current admin data
 *       500:
 *         description: Server error
 */




//@Endpoint http://localhost:5500/api/auth
//@Method GET
//@Access Private
router.get('/auth',listUser)
/**
 * @swagger
 * /api/auth:
 *   get:
 *     summary: List users
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Server error
 */




//@Empoint http://localhost:3000/api/auth
//@Method GET
//@Access Publish
router.put('/auth',editUser)
/**
 * @swagger
 * /api/auth:
 *   put:
 *     summary: Edit a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User edited successfully
 *       500:
 *         description: Server error
 */



//@Empoint http://localhost:3000/api/auth
//@Method GET
//@Access Publish
router.delete('/auth',deleteUser)
/**
 * @swagger
 * /api/auth:
 *   delete:
 *     summary: Delete a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       500:
 *         description: Server error
 */



router.post("/google-login", googleLogin);

router.post("/login-facebook", loginFacebook);

module.exports = router;