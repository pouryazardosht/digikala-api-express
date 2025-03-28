const { config } = require("dotenv");
const express = require("express");
const { initDatabase } = require("./config/models.initial");

config();

async function main() {
  const PORT = process.env.PORT;
  const app = express();

  await initDatabase();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use((req, res, next) => {
    return res.status(404).json({ message: "Not found" });
  });
  app.use((err, req, res, next) => {
    const status = err?.status ?? 500;
    const message = err?.message ?? "Internal Server Error";
    return res.status(status).json({ message });
  });
  app.listen(PORT ?? 3000, () => {
    console.log(`Server is running on : http://localhost:${PORT}`);
  });
}

main();
