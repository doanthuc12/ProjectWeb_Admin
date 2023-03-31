const { default: mongoose } = require("mongoose");
const { Customer } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/thucntd");

try {
  const data = {
    firstName: "John",
    lastName: "Brown",
    phoneNumber: "0943456780",
    address: "bhj street",
    email: "2@gmail.com",
    birthday: "2/2/2002",
  };

  const newItem = new Customer(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
