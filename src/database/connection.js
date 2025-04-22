const mysql = require("mysql2");

function connectToDatabase() {
  return mysql.createConnection(
    {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    (err) => {
      if (err) {
        console.error("Error connecting to the database:", err.message);
        return;
      }
      console.log("Connected to the database.");
    }
  );
}

function disconnectFromDatabase() {
  connection.end((err) => {
    if (err) {
      console.error("Error closing the database connection:", err.message);
    } else {
      console.log("Database connection closed.");
    }
  });
}

var connection = connectToDatabase();

module.exports = { connection, disconnectFromDatabase };
