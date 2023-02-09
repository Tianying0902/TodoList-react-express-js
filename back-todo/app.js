const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  getData(res);
});
app.get("/active", (req, res) => {
  getActiveData(res);
});
app.get("/completed", (req, res) => {
  getCompletedData(res);
});

app.get("/:id", (req, res) => {
  getCertainData(req, res);
});
app.post("/", bodyParser.urlencoded({ extend: true }), (req, res) => {
  postData(req, res);
});

app.delete("/:id", (req, res) => {
  deleteData(req, res);
});
app.delete("/", (req, res) => {
  deleteCompletedData(res);
});

app.put("/:id", (req, res) => {
  if (req.body.completed === 0 || req.body.completed === 1) {
    markData(req, res);
  } else {
    editData(req, res);
  }
});

app.listen(3001, () => {
  console.log("server listening on port:3001");
});

function editData(req, res) {
  let condition = req.params.id;
  let content = req.body.task;
  const connection = mySqlConnection();
  connection.connect();

  const updateTaskContent =
    "UPDATE todo SET task = '" + content + "' where id = " + condition + " ";
  connection.query(updateTaskContent, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });

  connection.end();
}
function postData(req, res) {
  const task = { task: req.body.task };
  const taskName = task.task;
  const taskDefault = false;
  const mysql = require("mysql");
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root12345",
    database: "nodeSql",
  });

  connection.connect();
  const sql =
    "INSERT into todo(task, completed) VALUES ('" +
    taskName +
    "'," +
    taskDefault +
    ")";
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    res.send(task);
    // console.log(rows);
  });

  connection.end();
}

function deleteData(req, res) {
  let id = req.params.id;
  const connection = mySqlConnection();

  connection.connect();
  const deleteTask = "DELETE from todo where id = " + id + "";
  connection.query(deleteTask, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });

  connection.end();
}
function mySqlConnection() {
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root12345",
    database: "nodeSql",
  });

  connection.connect();
  const sql = "DELETE from todo where completed = 1";
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });

  connection.end();
}
function getData(res) {
  const mysql = require("mysql");
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root12345",
    database: "nodeSql",
  });

  connection.connect();

  connection.query("SELECT * from todo", (err, rows) => {
    if (err) throw err;
    res.send(rows);
    // console.log(rows);
  });

  connection.end();
}

function getActiveData(res) {
  const mysql = require("mysql");
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root12345",
    database: "nodeSql",
  });

  connection.connect();

  connection.query("SELECT * from todo where completed = 0", (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });

  connection.end();
}
function getCompletedData(res) {
  const mysql = require("mysql");
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root12345",
    database: "nodeSql",
  });

  connection.connect();

  connection.query("SELECT * from todo where completed = 1", (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });

  connection.end();
}
function getCertainData(req, res) {
  let condition = req.params.id;
  const connection = mySqlConnection();

  connection.connect();

  const selectCertainTask = "SELECT * from todo where id = " + condition + "";
  connection.query(selectCertainTask, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });

  connection.end();
}
function markData(req, res) {
  let condition = req.params.id;
  let status = req.body.completed;
  const connection = mySqlConnection();

  connection.connect();

  const updateTaskStatus =
    "UPDATE todo SET completed = " + status + " where id = " + condition + " ";
  connection.query(updateTaskStatus, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });

  connection.end();
}
