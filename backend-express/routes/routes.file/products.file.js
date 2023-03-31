var express = require("express");
var router = express.Router();
var fs = require("fs");

const nanoid = require("nanoid");

const products = require("../data/products.json");
const fileName = "./data/products.json";
/* GET*/
router.get("/", function (req, res, next) {
  res.send(products);
});

//GET (MANY PARAMETERS)
// "/:id/:name" --> tên của parameters
router.get("/:id", function (req, res, next) {
  // const id = req.paramas.id;
  const { id } = req.params;
  const found = products.find((p) => {
    return p.id == id;
  });
  if (!found) {
    return res.status(404).json({ message: "Not Found" });
  }
  console.log("id", id);

  res.send(found);
});

/* POST*/
router.post("/", function (req, res, next) {
  const data = req.body;
  console.log("Data", data);
  products.push(data);
  data.id = nanoid();

  //WRITE
  //SAVE TO FILE JSON
  fs.writeFileSync(fileName, JSON.stringify(products), function (err) {
    if (err) {
      throw err;
    }
  });

  res.sendStatus(201).json({ message: "Creating product is successful." });
});

/* PATCH*/
router.patch("/:id", function (req, res, next) {
  const { id } = req.params;
  const data = req.body;
  console.log("Data", data);

  //tìm data để sửa
  let found = products.find((p) => {
    return p.id == id;
  });

  if (found) {
    //cập nhập data gì?
    for (let x in found) {
      if (data[x]) {
        found[x] = data[x];
      }
    }
    //Save to file JSON
    fs.writeFileSync(fileName, JSON.stringify(products), function (err) {
      if (err) throw err;
      console.log("Saved.");
    });
    return res
      .sendStatus(200)
      .json({ message: "Updating product is successful." });
  }

  return res.status(404).json({ message: "not found" });
});

/* DELETE*/
router.delete("/:id", function (req, res, next) {
  // const id = req.paramas.id;
  const { id } = req.params;
  const found = products.find((p) => {
    return p.id == id;
  });
  if (!found) {
    return res.status(404).json({ message: "Not Found" });
  }
  let remainProducts = products.filter((p) => {
    return p.id != id;
  });
  //Save to file JSON
  fs.writeFileSync(fileName, JSON.stringify(remainProducts), function (err) {
    if (err) throw err;
    console.log("Saved.");
  });
  res.sendStatus(200);
});

module.exports = router;
