`use strict`;
// exports.func1 = (req, res) => {
//   res.send("response test");
// };
const type1Model = require("../models/type1");

exports.createProduct = () => {
  type1Model.create();
};
