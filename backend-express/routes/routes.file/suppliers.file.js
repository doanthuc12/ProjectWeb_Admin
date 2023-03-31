var express = require("express");
var router = express.Router();
var fs = require("fs");

const suppliers = require("../data/suppliers.json");
const fileName = "./data/suppliers.json";

/* GET*/
router.get("/", function (req, res, next) {
  res.send(suppliers);
});

//GET (MANY PARAMETERS)
// "/:id/:name" --> tên của parameters
router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  const found = suppliers.find((p) => {
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
  console.log(data);
  suppliers.push(data);

  fs.writeFileSync(fileName, JSON.stringify(suppliers), function (err) {
    if (err) {
      throw err;
    }
  });
  res.sendStatus(201).json({ message: "Create suppliers is successful!" });
});

/* DELETE*/
router.delete("/:id", function (req, res, next) {
  const { id } = req.params;
  const found = suppliers.find((p) => {
    return p.id == id;
  });
  if (!found) {
    return res.status(404).json({ message: "Not Found!" });
  }
  let remainSuppliers = suppliers.filter((p) => {
    return p.id != id;
  });
  fs.writeFileSync(fileName, JSON.stringify(remainSuppliers), function (err) {
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
    fs.writeFileSync(fileName, JSON.stringify(suppliers), function (err) {
      if (err) throw err;
      console.log("Saved.");
    });
    return res
      .sendStatus(200)
      .json({ message: "Updating supplier is successful." });
  }

  return res.status(404).json({ message: "not found" });
});
module.exports = router;
