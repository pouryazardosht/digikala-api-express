const { Sequelize } = require("sequelize");
const { config } = require("dotenv");
config();
const sequelize = new Sequelize({
  dialect: "mariadb",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASWORD,
  database: process.env.DB_NAME,
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to MariaDB successfully");
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });

module.exports = sequelize;
