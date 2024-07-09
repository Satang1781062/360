const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const moment = require('moment');
const { getProductSalesData } = require('../controllers/chart');

// Route to get sales data based on month and completed orders
const getSalesData = async (req, res) => {
  const { month } = req.query;
  let matchStage = {
    orderstatus: 'Completed'
  };

  if (month) {
    const monthNum = parseInt(month);
    matchStage.createdAt = {
      $gte: new Date(moment().year(), monthNum - 1, 1),
      $lte: new Date(moment().year(), monthNum, 0)
    };
  }

  try {
    const salesData = await Order.aggregate([
      {
        $match: matchStage
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          sales: { $sum: '$cartTotal' }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ]);

    const formattedData = salesData.map(item => ({
      date: moment(`${item._id.year}-${item._id.month}-${item._id.day}`, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      sales: item.sales
    }));

    res.json(formattedData);
  } catch (err) {
    console.error('Error fetching sales data', err);
    res.status(500).send('Server Error');
  }
};

router.get("/sales-data", getSalesData);
router.get("/product-sales-data", getProductSalesData);

module.exports = router;
