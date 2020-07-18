const express = require("express");
const mysql = require("mysql");

const app = express();

app.use(express.static("public"));
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// create database connection
const dbconnection = mysql.createConnection({
  host: process.env.DB_URI,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

dbconnection.connect();

dbconnection.query(`SELECT * FROM url_shortner.urls;`, (err, rows, fields) => {
  if (err) throw err;
  console.log(rows);
});

// POST request
app.post("/generate", (req, res) => {
  let { handle, url } = req.body;
  res.json({
    handle,
    url,
  });
});

// GET request
app.get("/:handle", (req, res) => {
  res.redirect("http://kecman.dev");
});

// Start server
const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});
