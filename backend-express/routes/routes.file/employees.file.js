var express = require("express");
var router = express.Router();
var fs = require("fs");
const nanoid = require("nanoid");

const employees = require("../data/employees.json");
const fileName = "./data/employees.json";

/* GET*/
router.get("/", function (req, res, next) {
  res.send(employees);
});

//GET (MANY PARAMETERS)
router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  const found = employees.find((p) => {
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
  employees.push(data);
  data.id = nanoid();

  fs.writeFileSync(fileName, JSON.stringify(employees), function (err) {
    if (err) {
      throw err;
    }
  });
  res.status(201).json({ message: "Create employee is successful!" });
});

/* DELETE*/
router.delete("/:id", function (req, res, next) {
  const { id } = req.params;
  const found = employees.find((p) => {
    return p.id == id;
  });
  if (!found) {
    return res.status(404).json({ message: "Not Found!" });
  }
  let remainEmployees = employees.filter((p) => {
    return p.id != id;
  });

  // Save to file
  fs.writeFileSync(fileName, JSON.stringify(remainEmployees), function (err) {
    if (err) {
      throw err;
    }
  });
  res.status(200).json({ message: "Delete successful!" });
});

/* PATCH*/
router.patch("/:id", function (req, res, next) {
  const { id } = req.params;
  const data = req.body;
  console.log("Data =", data);

  //tìm data để sửa
  let found = employees.find((p) => {
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
    fs.writeFileSync(fileName, JSON.stringify(employees), function (err) {
      if (err) throw err;
      console.log("Saved.");
    });
    return res
      .sendStatus(200)
      .json({ message: "Updating employees is successful." });
  }

  return res.sendStatus(404).json({ message: "not found" });
});
module.exports = router;
