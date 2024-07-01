const express = require("express");
const router = express.Router();

// controller
const { createImage, removeImage } = require('../controllers/cloudinary');

// middleware
const { auth, adminCheck } = require('../middleware/auth');

//@Endpoint http://localhost:5000/api/images
router.post('/images', auth, adminCheck, createImage);
router.post('/removeimages', auth, adminCheck, removeImage);

router.post('/bill', auth,  createImage);
router.post('/removebill', auth, removeImage);


module.exports = router;
