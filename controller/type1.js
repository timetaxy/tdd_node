`use strict`;
// exports.func1 = (req, res) => {
//   res.send("response test");
// };
const type1Model = require("../models/type1");

exports.createProduct = (req, res, next) => {
  type1Model.create(req.body);
  res.status(201).send();
};
