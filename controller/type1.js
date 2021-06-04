`use strict`;
// exports.func1 = (req, res) => {
//   res.send("response test");
// };
const type1Model = require("../models/type1");

exports.createProduct = async (req, res, next) => {
  try {
    const created = await type1Model.create(req.body);
    console.log(`created:${created}`);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }

  // res.status(201).send();
};
