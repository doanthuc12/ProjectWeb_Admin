const { default: mongoose } = require("mongoose");

const { Category } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/thucntd");

try {
  const id = "63a6bc3ae3bf88908dfb0ad3";

  Category.findByIdAndDelete(id).then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
