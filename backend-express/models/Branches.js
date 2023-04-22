const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const branchSchema = new Schema({
  name: { type: String, required: [true, "Branch bắt buộc phải nhập"] },
  // description: String,
  // productId: { type: Schema.Types.ObjectId, ref: "Product", required: false },
});

// Virtual with Populate
// orderSchema.virtual("product", {
//   ref: "Product",
//   localField: "productId",
//   foreignField: "_id",
//   justOne: true,
// });
// // Virtuals in console.log()
// orderSchema.set("toObject", { virtuals: true });
// // Virtuals in JSON
// orderSchema.set("toJSON", { virtuals: true });

const Branch = model("Branch", branchSchema);

module.exports = Branch;
