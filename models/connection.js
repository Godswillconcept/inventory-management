const mysql = require("mysql2");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_mgt",
});
conn.connect((err) => console.log(err || "Database connected"));

module.exports = conn.promise();


