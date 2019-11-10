const Sequelize = require("sequelize");

module.exports = new Sequelize("todolistwithnodejs", "todolistwithnodejs", "testtodo", {
    host: "localhost",
    dialect: "postgres"
  });