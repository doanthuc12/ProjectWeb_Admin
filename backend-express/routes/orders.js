const { default: mongoose } = require("mongoose");

const { Order } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/thucntd");

var express = require("express");
var router = express.Router();

// GET
router.get("/", function (req, res, next) {
  try {
    Order.find()
      .populate("orderDetails.product")
      .populate("customer")
      .populate("employee")
      .populate("product")
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
    Order.findById(id)
      .populate("orderDetails.product")
      .populate("customer")
      .populate("employee")
      .populate("product")
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

    const newItem = new Order(data);
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

    Order.findByIdAndUpdate(id, data, {
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
    Order.findByIdAndDelete(id)
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
// QUESTIONS 7,9
// ------------------------------------------------------------------------------------------------
router.get("/question/7", function (req, res) {
  const text = "COMPLETED";
  const query = { status: new RegExp(`${text}`) };

  Order.find(query)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// ------------------------------------------------------------------------------------------------
// QUESTIONS 8,10
// ------------------------------------------------------------------------------------------------
router.get("/question/8", function (req, res) {
  const text = "COMPLETED";
  const eqStatus = { status: new RegExp(`${text}`) };
  const today = new Date();
  const eqDay = {
    $eq: [{ $dayOfMonth: "$createdDate" }, { $dayOfMonth: today }],
  };
  const query = {
    $expr: {
      $and: [eqStatus, eqDay],
    },
  };

  Order.find(query)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// ------------------------------------------------------------------------------------------------
// QUESTIONS 8b
// ------------------------------------------------------------------------------------------------
router.get("/question/8b", function (req, res) {
  const text = "COMPLETED";
  const eqStatus = { status: new RegExp(`${text}`) };
  const today = new Date();
  const eqCreatedDay = {
    $eq: [{ $dayOfMonth: "$createdDate" }, { $dayOfMonth: today }],
  };
  const eqShippedDay = {
    $eq: [{ $dayOfMonth: "$shippedDate" }, { $dayOfMonth: today }],
  };
  const query = {
    $expr: {
      $and: [eqStatus, eqCreatedDay, eqShippedDay],
    },
  };

  Order.find(query)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// ------------------------------------------------------------------------------------------------
// QUESTIONS 11,12
// ------------------------------------------------------------------------------------------------
router.get("/question/11", function (req, res) {
  const text = "CASH";
  const query = { paymentType: new RegExp(`${text}`) };

  Order.find(query)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// ------------------------------------------------------------------------------------------------
// QUESTIONS 13
// ------------------------------------------------------------------------------------------------
router.get("/question/13", function (req, res) {
  const text = "Hà Nội";
  const query = { shippingAddress: new RegExp(`${text}`) };

  Order.find(query)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});
module.exports = router;
