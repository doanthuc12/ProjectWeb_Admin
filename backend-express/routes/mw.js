var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("Hello");
  next();
});

router.get("/", function (req, res, next) {
  res.send({ message: "Xin chao" });
});

router.post("/", function (req, res, next) {});
module.exports = router;
