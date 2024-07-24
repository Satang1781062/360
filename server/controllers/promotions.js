const Promotion = require('../models/Promotion');

exports.createPromotion = async (req, res) => {
  try {
    const { title, description, discount, startDate, endDate, products } = req.body;
    const newPromotion = new Promotion({ title, description, discount, startDate, endDate, products });
    await newPromotion.save();

    for (const productId of products) {
      const product = await Product.findById(productId);
      if (product) {
        const discountedPrice = product.price - (product.price * discount / 100);
        product.discountedPrice = discountedPrice;
        await product.save();
      }
    }

    res.json(newPromotion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find({}).populate('products').exec();
    
    // คำนวณราคาที่มีส่วนลด
    const promotionsWithDiscountedPrices = promotions.map(promotion => {
      const discountedProducts = promotion.products.map(product => {
        const discountedPrice = product.price - (product.price * promotion.discount / 100);
        return { ...product._doc, discountedPrice }; // ใช้ ._doc เพื่อดึงข้อมูลดิบของ mongoose document
      });
      return { ...promotion._doc, products: discountedProducts };
    });

    res.json(promotionsWithDiscountedPrices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePromotion = async (req, res) => {
  try {
    const updatedPromotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
    res.json(updatedPromotion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }

    // ลบ discountedPrice ในสินค้า
    for (const productId of promotion.products) {
      const product = await Product.findById(productId);
      if (product) {
        product.discountedPrice = undefined;
        await product.save();
      }
    }

    await Promotion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Promotion deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
