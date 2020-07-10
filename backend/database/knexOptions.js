require("dotenv").config();

module.exports = {
  client: "mysql2",
  connection: {
    port: 8889,
    host: "localhost",
    user: "root",
    password: "root",
    database: "map",
    // password: "root",
    // password: "root",
    // database: "library",
  },
};
