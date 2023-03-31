const { default: mongoose } = require("mongoose");

const { Customer } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/thucntd");

var express = require("express");
var router = express.Router();

const { findDocuments } = require("../helpers/MongoDbHelper");

// GET
router.get("/", function (req, res, next) {
  try {
    Customer.find()
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

// GET:id
router.get("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    Customer.findById(id)
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

// POST
router.post("/", function (req, res, next) {
  try {
    const data = req.body;

    const newItem = new Customer(data);
    newItem
      .save()
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

// PATCH/:id
router.patch("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;

    Customer.findByIdAndUpdate(id, data, {
      new: true,
    })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (error) {
    res.sendStatus(500);
  }
});

// DELETE
router.delete("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    Customer.findByIdAndDelete(id)
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

// ------------------------------------------------------------------------------------------------
// QUESTION 4
// ------------------------------------------------------------------------------------------------
router.get("/question/4", function (req, res) {
  const text = "Korea";
  const query = { address: new RegExp(`${text}`) };
  //address có chứa từ "Korea"

  Customer.find(query)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});
// QUESTION 2
// ------------------------------------------------------------------------------------------------
//http://localhost:9000/products/question/2?stock=
// router.get("/question/2", function (req, res, next) {
//   try {
//     let stock = req.query.stock;
//     let query = { stock: { $lte: stock } };
//     Product.find(query)
//       .then((result) => {
//         res.send(result);
//       })
//       .catch((err) => {
//         res.status(400).send({ message: err.message });
//       });
//   } catch (err) {
//     res.sendStatus(500);
//   }
// });

// ------------------------------------------------------------------------------------------------
// QUESTIONS 5
// ------------------------------------------------------------------------------------------------
router.get("/question/5", function (req, res) {
  let year = req.query.year;
  const query = {
    $expr: {
      $eq: [{ $year: "$birthday" }, year],
    },
  };

  Customer.find(query)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// ------------------------------------------------------------------------------------------------
// QUESTIONS 6
// ------------------------------------------------------------------------------------------------
router.get("/question/6", function (req, res) {
  const today = new Date();
  const eqDay = { $eq: [{ $dayOfMonth: "$birthday" }, { $dayOfMonth: today }] };
  const eqMonth = { $eq: [{ $month: "$birthday" }, { $month: today }] };

  const query = {
    $expr: {
      $and: [eqDay, eqMonth],
    },
  };

  Customer.find(query)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});
module.exports = router;
