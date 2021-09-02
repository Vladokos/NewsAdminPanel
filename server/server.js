const fs = require("fs");

const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const sharp = require("sharp");

const Schema = mongoose.Schema;

const app = express();
const jsonParser = express.json();

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "" + file.originalname);
  },
});
const upload = multer({ storage: storageConfig }).single("image");

const articleSchema = new Schema(
  {
    image: String,
    title: String,
    category: String,
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

app.use(express.static("uploads"));

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

app.put("/image", upload, (req, res) => {
  if (req.file === undefined) {
    res.sendStatus(200);
    throw console.log("req.file is undefinde");
  }
  const id = req.body.id;
  const image = req.file.filename;
  const oldImage = req.body.oldImage;

  sharp(image)
    .resize(320, 240)
    .toFile("./uploads/" + image, (err) => {
      if (err) throw err;
      fs.unlinkSync(image);
      if (oldImage !== null) {
        fs.access("./uploads/" + oldImage, fs.F_OK, (notFound) => {
          if (notFound) {
            console.log("file not found");
            return null;
          }
          fs.unlinkSync("./uploads/" + oldImage);
        });
      }
    });

  const article = {
    id: id,
    image: image,
  };

  Article.findByIdAndUpdate({ _id: id }, article, { new: true }, (err, doc) => {
    if (err) throw err;
    res.json(doc).status(200);
  });
});

app.put("/article", jsonParser, (req, res) => {
  if (!req.body) res.sendStatus(400);

  const id = req.body.id;
  const title = req.body.titles;
  const category = req.body.category;
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

app.delete("/article/:id", jsonParser, (req, res) => {
  const id = req.params.id;
  const image = req.body.image;

  fs.access("./uploads/" + image, fs.F_OK, (notFound) => {
    if (notFound) {
      return null;
    }
    fs.unlinkSync("./uploads/" + image);
  });

  Article.findByIdAndDelete({ _id: id }, (err, doc) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

app.listen(5000, () => {
  console.log("Servr is running");
});
