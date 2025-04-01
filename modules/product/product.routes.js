const { Router } = require("express");
const { createProductsValidation } = require("./validation");
const {
  createProductHandler,
  getProductsHandler,
  getProductByIdHandler,
  deleteProductHandler,
} = require("./product.service");

const router = Router();

router.post("/", createProductsValidation, createProductHandler);
router.get("/", getProductsHandler);
router.get("/:id", getProductByIdHandler);
router.delete("/:id", deleteProductHandler);

module.exports = {
  productRoutes: router,
};
