const express = require('express');
const router = express.Router();

// controller
const { createPromotion, listPromotions, updatePromotion, deletePromotion,} = require('../controllers/promotions');

// middleware
const { auth, adminCheck } = require('../middleware/auth');


router.post('/promotion', auth, adminCheck, createPromotion);
router.get('/promotions', listPromotions);
router.put('/promotion/:id', auth, adminCheck, updatePromotion);
router.delete('/promotion/:id', auth, adminCheck, deletePromotion);

module.exports = router;
