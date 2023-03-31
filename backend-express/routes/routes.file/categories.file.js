var express = require("express");
var router = express.Router();
var fs = require("fs");
const nanoid = require("nanoid");

const categories = require("../../data/categories.json");
const fileName = "./data/categories.json";

//* GET*/
router.get("/", function (req, res, next) {
  res.send(categories);
});

//GET (MANY PARAMETERS)
router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  const found = categories.find((p) => {
    return p.id == id;
  });
  if (!found) {
    return res.status(404).json({ message: "Not Found!" });
  }
  console.log("id", id);
  res.send(found);
});

/* POST*/
router.post("/", function (req, res, next) {
  const data = req.body;
  console.log("Data = ", data);
  categories.push(data);
  data.id = nanoid();

  fs.writeFileSync(fileName, JSON.stringify(categories), function (err) {
    if (err) {
      throw err;
    }
  });
  res.sendStatus(201).json({ message: "Create customer is successful!" });
});

/* DELETE*/
router.delete("/:id", function (req, res, next) {
  const { id } = req.params;
  const found = categories.find((p) => {
    return p.id == id;
  });
  if (!found) {
    return res.status(404).json({ message: "Not Found!" });
  }
  let remainCategories = categories.filter((p) => {
    return p.id != id;
  });
  fs.writeFileSync(fileName, JSON.stringify(remainCategories), function (err) {
    if (err) {
      throw err;
    }
  });
  res.sendStatus(200).json({ message: "Delete successful!" });
});

/* PATCH*/
router.patch("/:id", function (req, res, next) {
  const { id } = req.params;
  const data = req.body;
  console.log("Data =", data);

  //tìm data để sửa
  let found = categories.find((p) => {
    return p.id == id;
  });

  if (found) {
    //cập nhập data gì?
    for (let x in data) {
      found[x] = data[x];
    }
    //Save to file JSON
    fs.writeFileSync(fileName, JSON.stringify(categories), function (err) {
      if (err) throw err;
      console.log("Saved.");
    });
    return res
      .sendStatus(200)
      .json({ message: "Updating categories is successful." });
  }

  return res.status(404).json({ message: "not found" });
});

module.exports = router;
