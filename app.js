const { config } = require("dotenv");
const express = require("express");
const { initDatabase } = require("./config/models.initial");
const { productRoutes } = require("./modules/product/product.routes");

config();

async function main() {
  const PORT = process.env.PORT;
  const app = express();
  await initDatabase();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/product", productRoutes);
  app.use((req, res, next) => {
    return res.status(404).json({ message: "Not found" });
  });
  app.use((err, req, res, next) => {
    const status = err?.status ?? err?.statusCode ?? 500;
    let message = err?.message ?? "Internal Server Error";
    if (err?.name == "ValidationError") {
      const { details } = err;
      message = details?.body?.[0]?.message ?? "internal server error";
    }
    return res.status(status).json({ message });
  });
  app.listen(PORT ?? 3000, () => {
    console.log(`Server is running on : http://localhost:${PORT}`);
  });
}

main();
