const mysql = require("mysql");
module.exports = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "tienda"
});