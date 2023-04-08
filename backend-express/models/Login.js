const mongoose = require("mongoose");
const { array } = require("yup");
const { Schema, model } = mongoose;

const loginSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    active: { type: Boolean, required: true },
    roles: { type: Array, required: true },
  },
  {
    versionKey: false,
  }
);

const Login = model("Login", loginSchema);
module.exports = Login;
