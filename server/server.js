/** @format */

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { send } = require("process");

const app = express();

const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://0.0.0.0:27017";
const client = new MongoClient(url);

// middle_wares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client/public")));
app.use("/image", express.static("client/public/upload"));

app.get("/", (req, res) => {
  res.send("Backend connected...");
});

/**
 * data upload
 */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// data insertion in the

app.post("/insert", upload.single("file"), (req, res) => {
  console.log("In insert");
  const file = "upload/" + req.file.originalname;
  const fileName = req.file.originalname;
  console.log(file);
  const value = [
    {
      profilePath: file,
    },
  ];
  console.log("value  ", value);
  const val = JSON.stringify(value);
  console.log("val  ", val);

  const db = client.db("guru");

  const collection = db.collection("images");

  const decr = fs.readFileSync(`../client/public/${file}`, {
    encoding: "base64",
  });
  console.log("decrepted");

  let buff = new Buffer(decr, "base64");
  fs.writeFileSync("./stack-abuse-logo-out.pdf", buff);
  res.send(value);

  /**
   * insertin db
   */

  // Insert the document into the collection
  const imageDocument = {
    filename: fileName,
    path: file,
    encoded: decr,
    // You can add more fields to store additional information if needed
  };

  collection.insertOne(imageDocument, function (err, result) {
    if (err) {
      console.error("Failed to insert image document:", err);
    }
    console.log("data written");
  });
  // dataGt();
});

app.get("/getGroupsData", (req, res) => {
  console.log("hh");
  collection.find({ filename: "download.jfif" }).toArray((err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("hell");
  });
});

app.get("/j", (req, res) => {
  const db = client.db("guru");
  db.collection("images")
    .find({ filename: "download.jfif" })
    .toArray((err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
});

app.listen(3333, () => {
  console.log("backend started");
  db = client.db("image");
  console.log(db);
  console.log("db connected");
});
