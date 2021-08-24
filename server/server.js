const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

const articleSchema = new Schema(
  {
    category: String,
    title: String,
    text: String,
  },
  { versionKey: false }
);
const Article = mongoose.model("Article", articleSchema);

mongoose.connect("mongodb://localhost:27017/articles", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

app.get("/article/", (req, res) => {
  Article.find({}, (err, articles) => {
    if (err) throw err;
    res.send(articles);
  });
});

app.get("/article/:id", (req, res) => {
  const id = req.params.id;
  Article.findOne({ _id: id }, (err, article) => {
    if (err) throw err;
    res.send(article);
  });
});

app.post("/article", jsonParser, (req, res) => {
  if (!req.body) res.sendStatus(400);

  const category = req.body.category;
  const title = req.body.titles;
  const text = req.body.texts;

  const article = new Article({ category: category, title: title, text: text });

  article.save((err, doc) => {
    if (err) throw err;
    res.json(doc).status(200);
  });
});

app.put("/article", jsonParser, (req, res) => {
  if (!req.body) res.sendStatus(400);

  const id = req.body.id;
  const category = req.body.category;
  const title = req.body.titles;
  const text = req.body.texts;

  const article = {
    id: id,
    category: category,
    title: title,
    text: text,
  };

  Article.findOneAndUpdate({ _id: id }, article, { new: true }, (err, doc) => {
    if (err) throw err;
    res.json(doc).status(200);
  });
});

app.delete("/article/:id", (req, res) => {
  const id = req.params.id;

  Article.findByIdAndDelete({ _id: id }, (err, doc) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

app.listen(5000, () => {
  console.log("Servr is running");
});
