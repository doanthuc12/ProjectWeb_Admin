const { default: mongoose } = require("mongoose");
const { Category } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/thucntd");

try {
  const data = {
    name: "Mỹ phẩm",
    description: "Mô tả ...",
  };

  const newItem = new Category(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
