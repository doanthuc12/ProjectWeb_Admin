const { default: mongoose } = require("mongoose");

const { Order } = require("../models");
const { populate } = require("../models/Category");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/thucntd");

try {
  Order.find({})
    .populate("customer")
    .populate("employee")
    .then((result) => {
      console.log(result);
    });
} catch (err) {
  console.log(err);
}
