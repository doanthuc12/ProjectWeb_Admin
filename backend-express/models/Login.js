const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const loginSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    roles: { type: Array, required: true },
    active: { type: Boolean },
  },
  {
    versionKey: false,
  }
);

const Login = model("Login", loginSchema);
module.exports = Login;
