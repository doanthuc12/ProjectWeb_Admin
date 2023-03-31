const { default: mongoose } = require("mongoose");

const { Order } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/thucntd");

try {
  const id = "636263af9766a403ebf7328c";
  Order.findById(id).then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
