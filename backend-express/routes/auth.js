var express = require("express");
var router = express.Router();
const yup = require("yup");
var { validateSchema } = require("../validations/validateSchema");

const loginSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(3, "Bạn phải nhập ít nhất 3 kí tự.")
      .max(31)
      .required("Password không được bỏ trống."),
  }),
  // params: yup.object({}),
});

router.post("/login", validateSchema(loginSchema), function (req, res, next) {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "admin") {
    res.send({ ok: true });
  }

  res.status(401).send({ ok: false });
});

module.exports = router;
