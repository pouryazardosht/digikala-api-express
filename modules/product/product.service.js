const { Product } = require('./product.model');

async function createProduct(req, res, next) {
  try {
    const {
      title,
      description,
      type,
      price,
      discount,
      active_discount,
      colors,
      sizes,
    } = req.body;
    const product = await Product.create({
      title,
      description,
      price,
      discount,
      active_discount,
    });
  } catch (error) {
    next(error);
  }
}
