const sequelize = require("./sequelize.config");
const {
  Product,
  ProductDetail,
  ProductColor,
  ProductSize,
} = require("../modules/product/product.model");
async function initDatabase() {
  Product.hasMany(ProductDetail, {
    foreignKey: "product_id",
    sourceKey: "id",
    as: "details",
  });
  ProductDetail.belongsTo(Product, {
    foreignKey: "product_id",
    targetKey: "id",
  });

  Product.hasMany(ProductColor, {
    foreignKey: "product_id",
    sourceKey: "id",
    as: "colors",
  });
  ProductColor.belongsTo(Product, {
    foreignKey: "product_id",
    targetKey: "id",
  });

  Product.hasMany(ProductSize, {
    foreignKey: "product_id",
    sourceKey: "id",
    as: "sizes",
  });
  ProductSize.belongsTo(Product, {
    foreignKey: "product_id",
    targetKey: "id",
  });

  // await sequelize.sync({ alter: true });
}

module.exports = { initDatabase };
