var express = require("express");
var router = express.Router();
var fs = require("fs");
const nanoid = require("nanoid");

const customers = require("../../data/customers.json");
const fileName = "./data/customers.json";

/* GET*/
router.get("/", function (req, res, next) {
  res.send(customers);
});

//GET (MANY PARAMETERS)
router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  const found = customers.find((p) => {
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
  customers.push(data);
  data.id = nanoid();

  fs.writeFileSync(fileName, JSON.stringify(customers), function (err) {
    if (err) {
      throw err;
    }
  });
  res.sendStatus(201).json({ message: "Create customer is successful!" });
});

/* DELETE*/
router.delete("/:id", function (req, res, next) {
  const { id } = req.params;
  const found = customers.find((p) => {
    return p.id == id;
  });
  if (!found) {
    return res.status(404).json({ message: "Not Found!" });
  }
  let remainCustomers = customers.filter((p) => {
    return p.id != id;
  });
  fs.writeFileSync(fileName, JSON.stringify(remainCustomers), function (err) {
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
  let found = customers.find((p) => {
    return p.id == id;
  });

  if (found) {
    //cập nhập data gì?
    for (let x in data) {
      found[x] = data[x];
    }
    //Save to file JSON
    fs.writeFileSync(fileName, JSON.stringify(customers), function (err) {
      if (err) throw err;
      console.log("Saved.");
    });
    return res
      .sendStatus(200)
      .json({ message: "Updating customers is successful." });
  }

  return res.status(404).json({ message: "not found" });
});
module.exports = router;
