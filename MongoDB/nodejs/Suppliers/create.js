const { default: mongoose } = require("mongoose");
const { Supplier } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/thucntd");

try {
  const data = {
    name: "3CE",
    email: "3ce@gmail.com",
    address: "4 ABC Street, Japan",
  };

  const newItem = new Supplier(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
