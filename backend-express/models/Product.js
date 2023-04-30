const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const productSchema = Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true, min: 0, default: 0 },
    discount: { type: Number, min: 0, max: 75, default: 0 },
    // imgLeave: { type: String, required: false },
    sizes: [
      {
        size: {
          type: String,
          required: true,
          validate: {
            validator: (value) => {
              if (
                [
                  "XS - Chest 33-34",
                  "S - Chest 36-38",
                  "M - Chest 39-41",
                  "L - Chest 42-44",
                  "XL - Chest 45-48",
                  "2XL - Chest 49-53",
                ].includes(value)
              ) {
                return true;
              }
              return false;
            },
            message: `Size {VALUE} is invalid!`,
          },
        },
        stock: { type: Number, min: 0, default: 0 },
      },
    ],
    branchId: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: false,
    },
    supplierId: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      required: false,
    },
  },
  {
    versionKey: false,
  }
);

// Virtuals
productSchema.virtual("total").get(function () {
  return (this.price * (100 - this.discount)) / 100;
});

productSchema.virtual("branch", {
  ref: "Branch",
  localField: "branchId",
  foreignField: "_id",
  justOne: true,
});

productSchema.virtual("supplier", {
  ref: "Supplier",
  localField: "supplierId",
  foreignField: "_id",
  justOne: true,
});

productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });

productSchema.plugin(mongooseLeanVirtuals);

const Product = model("Product", productSchema);
module.exports = Product;
