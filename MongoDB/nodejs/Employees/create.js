const { default: mongoose } = require("mongoose");
const { Employee } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/thucntd");

try {
  const data = {
    firstName: "Anna",
    lastName: "Lee",
    phoneNumber: "0942123456",
    address: "abc street",
    email: "1@gmail.com",
    birthday: "1/1/2001",
  };

  const newItem = new Employee(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
