const { Router } = require("express");
const { createProductsValidation } = require("./validation");
const {
  createProductHandler,
  getProductsHandler,
  getProductByIdHandler,
} = require("./product.service");

const router = Router();

router.post("/", createProductsValidation, createProductHandler);
router.get("/", getProductsHandler);
router.get("/:id", getProductByIdHandler);

module.exports = {
  productRoutes: router,
};
