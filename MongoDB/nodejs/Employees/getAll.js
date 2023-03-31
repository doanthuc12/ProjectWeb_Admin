const { default: mongoose } = require("mongoose");

const { Employee } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/thucntd");

try {
  Employee.find().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
