const { default: mongoose } = require("mongoose");
const yup = require("yup");

const { Product } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/thucntd");

var express = require("express");
const { query } = require("express");
var router = express.Router();

// GET
router.get("/", function (req, res, next) {
  try {
    Product.find()
      .populate("category")
      .populate("supplier")
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
    Product.findById(id)
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

    const newItem = new Product(data);
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

    Product.findByIdAndUpdate(id, data, {
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
    Product.findByIdAndDelete(id)
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
// QUESTION 1
// ------------------------------------------------------------------------------------------------
//http://localhost:9000/products/question/1?discount=10

const question1Schema = yup.object({
  query: yup.object({
    discount: yup.number().integer().min(0).max(100).required(),
  }),
  // params: yup.object({}),
});

router.get("/question/1", function (req, res, next) {
  try {
    let discount = req.query.discount;
    let query = { discount: { $lte: discount } };
    Product.find(query)
      .populate("category")
      .populate("supplier")
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
// QUESTION 2
// ------------------------------------------------------------------------------------------------
//http://localhost:9000/products/question/2?stock=
router.get("/question/2", function (req, res, next) {
  try {
    let stock = req.query.stock;
    let query = { stock: { $lte: stock } };
    Product.find(query)
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
// QUESTION 3
// ------------------------------------------------------------------------------------------------
router.get("/question/3", function (req, res, next) {
  try {
    // total = price * (100 - discount) /100

    const s = { $subtract: [100, "$discount"] };
    const m = { $multiply: ["$price", s] };
    const d = { $divide: [m, 100] };

    const price = req.query.price;

    let aggregate = [{ $match: { $expr: { $lte: [d, price] } } }];

    // let aggregate = [{ $match: { $expr: { $lte: [d, price] } } }];

    Product.aggregate(aggregate)
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
// QUESTIONS 25
// ------------------------------------------------------------------------------------------------
router.get("/question/25", async (req, res, next) => {
  try {
    const aggregate = [
      {
        $unwind: {
          path: "$orderDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      { $addFields: { productId: "$orderDetails.productId" } },
      { $project: { productId: 1 } },
      {
        $group: {
          _id: null,
          productIds: { $addToSet: "$productId" }, // Tạo mảng đã mua
        },
      },
      {
        $lookup: {
          from: "products",
          let: { productIds: "$productIds" },
          pipeline: [
            { $match: { $expr: { $not: { $in: ["$_id", "$$productIds"] } } } },
          ],
          as: "productsNotInOrderDetails",
        },
      },
      { $project: { productsNotInOrderDetails: 1, _id: 0 } },
    ];
    Order.aggregate(aggregate)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
