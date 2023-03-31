const { default: mongoose } = require("mongoose");

const { Product } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/thucntd");

try {
  const id = "63aa761e8293528a3985570b";

  Product.findByIdAndDelete(id).then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
