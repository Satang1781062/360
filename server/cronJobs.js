const cron = require("node-cron");
const Promotion = require("./models/Promotion");
const Product = require("./models/Product");

// ตั้งค่า cron job เพื่อรันทุกวันเวลา 00:00
cron.schedule('0 0 * * *', async () => {
  console.log('Cron job started');
  try {
    const now = new Date();
    console.log('Current Date:', now);

    const expiredPromotions = await Promotion.find({ endDate: { $lt: now } });
    console.log('Expired Promotions:', expiredPromotions);

    for (const promo of expiredPromotions) {
      for (const productId of promo.products) {
        const product = await Product.findById(productId);
        if (product) {
          product.discountedPrice = undefined;
          await product.save();
        }
      }

      await Promotion.findByIdAndDelete(promo._id);
    }

    console.log(`Deleted ${expiredPromotions.length} expired promotions`);
  } catch (err) {
    console.error('Error deleting expired promotions:', err);
  }
});

