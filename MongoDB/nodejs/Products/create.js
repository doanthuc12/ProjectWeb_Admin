const { default: mongoose } = require("mongoose");
const { Product } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/thucntd");

try {
  const data = {
    name: "Cushion",
    price: 400,
    discount: 25,
    stock: 10,
    categoryId: "63ac115f3216ef8827ffd43a",
    supplierId: "63ac133a60c1527297f952bd",
  };

  const newItem = new Product(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
