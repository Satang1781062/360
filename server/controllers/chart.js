const Product = require("../models/Product");

exports.getProductSalesData = async (req, res) => {
  try {
    const salesData = await Product.aggregate([
      {
        $group: {
          _id: '$title',
          totalSold: { $sum: '$sold' }
        }
      },
      {
        $sort: { totalSold: -1 }
      }
    ]);

    res.json(salesData);
  } catch (err) {
    console.error('Error fetching product sales data', err);
    res.status(500).send('Server Error');
  }
};
