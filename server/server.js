const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");

const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

// const userSchema = new Schema({
//     category: String,
//     title: String,
//     text: String,
// });

// mongoose.connect("mongodb://localhost:27017/namedb",{ useUnifiedTopology: true, useNewUrlParser: true });

app.get("/text", jsonParser, (req, res) => {
  fs.readFile("textUsers.json", (err, data) => {
    if (err) throw err;
    const result = JSON.parse(data);
    res.json(result);
  });
});

app.post("/text", jsonParser, (req, res) => {
  const category = req.body.category;
  const title = req.body.titles;
  const text = req.body.texts;

  let document = {
    category: category,
    title: title,
    text: text,
  };
  fs.writeFile("textUsers.json", JSON.stringify(document), (err) => {
    if (err) throw err;
  });
});

app.listen(5000, () => {
  console.log("Servr is running");
});
