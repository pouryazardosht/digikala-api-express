const { Router } = require("express");
const { createProductsValidation } = require("./validation");
const { createProductHandler } = require("./product.service");

const router = Router();
router.post("/", createProductsValidation, createProductHandler);

module.exports = {
  productRoutes: router,
};
