const { CONNECTION_STRING } = require("../constants/dbSettings");
const { default: mongoose } = require("mongoose");

const { Shipper } = require("../models");
// MONGOOSE
// mongoose.connect("mongodb://127.0.0.1:27017/thucntd");
mongoose.set("strictQuery", false);
mongoose.connect(CONNECTION_STRING);

var express = require("express");
var router = express.Router();

// GET
router.get("/", function (req, res, next) {
  try {
    Shipper.find()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
