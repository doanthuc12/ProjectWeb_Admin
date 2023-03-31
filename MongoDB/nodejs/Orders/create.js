const { default: mongoose } = require("mongoose");
const { Order } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/thucntd");

try {
  const data = {
    createdDate: 1 / 1 / 2022,
    shippedDate: 2 / 1 / 2022,
    status: "CANCELED",
    description: "4 xyz street",
    shippingAddress: "xyz street",
    paymentType: "CREDIT CARD",
    customerId: "63aa72997f9bf384e6b87d8f",
    employeeId: "63aa77313ab6b16f83ab7005",
  };

  const newItem = new Order(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
