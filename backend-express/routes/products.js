const { CONNECTION_STRING } = require("../constants/dbSettings");
const { default: mongoose } = require("mongoose");
const yup = require("yup");

const { Product } = require("../models");
// MONGOOSE
// mongoose.connect("mongodb://127.0.0.1:27017/thucntd");
mongoose.set("strictQuery", false);
mongoose.connect(CONNECTION_STRING);

var express = require("express");
const { query } = require("express");
var router = express.Router();

// GET
router.get("/", function (req, res, next) {
  try {
    Product.find()
      .populate("branchId")
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

// const question1Schema = yup.object({
//   query: yup.object({
//     discount: yup.number().integer().min(0).max(100).required(),

//   }),
//   params: yup.object({}),
// });

router.get("/question/1", function (req, res, next) {
  try {
    let discount = req.query.discount;
    let query = { discount: { $lte: discount } };
    Product.find(query)
      .populate("branchId")
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
      .populate("branchId")
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
// QUESTION 2/1
// ------------------------------------------------------------------------------------------------
//http://localhost:9000/products/question/2?stock=
router.get("/question/2/1", function (req, res, next) {
  try {
    let query = { "sizes.stock": { $lte: 10 } }; // modify the query to match stock in sizes array
    let projection = {
      title: 1,
      price: 1,
      sizes: { $elemMatch: { stock: { $lte: 10 } } },
    }; // project only required fields
    Product.find(query, projection)
      .populate("branchId")
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

router.get("/question/2/1", function (req, res, next) {
  try {
    let stock = req.query.sizes.stock;
    const query = { "sizes.stock": { $lte: stock } };

    let projection = {
      title: 1,
      price: 1,
      sizes: { $elemMatch: { stock: { $lte: stock } } },
    }; // project only required fields
    Product.find(query, projection)
      .populate("branchId")
      .populate("supplierId")
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

// SORT BY NAME
// ------------------------------------------------------------------------------------------------
//http://localhost:9000/products/4/1?stock=
router.get("/question/4", function (req, res) {
  const text = "Twisted Tailor";
  const query = { title: new RegExp(`${text}`) };

  Product.find(query)
    .populate("branchId")
    .populate("supplier")
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get("/question/4/1", function (req, res, next) {
  try {
    let text = req.query.title;
    const query = { title: new RegExp(`${text}`) };
    Product.find(query)
      .populate("branchId")
      .populate("supplier")
      .then((result) => {
        res.json(result);
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
