var express = require("express");
var router = express.Router();
var fs = require("fs");

const orders = require("../data/orders.json");
const fileName = "./data/orders.json";

/* GET*/
router.get("/", function (req, res, next) {
  res.send(orders);
});

//GET (MANY PARAMETERS)
router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  const found = orders.find((p) => {
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
  orders.push(data);

  fs.writeFileSync(fileName, JSON.stringify(orders), function (err) {
    if (err) {
      throw err;
    }
  });
  res.sendStatus(201).json({ message: "Create order is successful!" });
});

/* DELETE*/
router.delete("/:id", function (req, res, next) {
  const { id } = req.params;
  const found = orders.find((p) => {
    return p.id == id;
  });
  if (!found) {
    return res.status(404).json({ message: "Not Found!" });
  }
  let remainOrders = orders.filter((p) => {
    return p.id != id;
  });
  fs.writeFileSync(fileName, JSON.stringify(remainOrders), function (err) {
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
  let found = orders.find((p) => {
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
    fs.writeFileSync(fileName, JSON.stringify(orders), function (err) {
      if (err) throw err;
      console.log("Saved.");
    });
    return res
      .sendStatus(200)
      .json({ message: "Updating orders is successful." });
  }

  return res.status(404).json({ message: "not found" });
});
module.exports = router;
