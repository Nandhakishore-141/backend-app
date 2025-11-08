const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "777kishore,aids",
  database: "student",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to database.");
  }
});


app.post("/students", (req, res) => {
  const { name,age,grade, email, password } = req.body;
  const sql = "INSERT INTO students (name,age , grade, email, password) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, age , grade , email, password], (err, result) => {
    if (err) {
      console.error("Error inserting student:", err);
      res.status(500).send("Error inserting student");
    } else {
      res.status(200).send("Student added successfully");
    }
  });
});


app.get("/students", (req, res) => {
  const sql = "SELECT * FROM students";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching students:", err);
      res.status(500).send("Error fetching students");
    } else {
      res.status(200).json(result);
    }
  });
});


app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const { name, age ,grade , email, password } = req.body;
  const sql = "UPDATE students SET name=?, age=? , grade=?, email=?, password=? WHERE id=?";
  db.query(sql, [name, age , grade , email, password, id], (err, result) => {
    if (err) {
      console.error("Error updating student:", err);
      res.status(500).send("Error updating student");
    } else {
      res.status(200).send("Student updated successfully");
    }
  });
});


app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM students WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting student:", err);
      res.status(500).send("Error deleting student");
    } else {
      res.status(200).send("Student deleted successfully");
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
