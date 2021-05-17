`use strict`;
// exports.func1 = (req, res) => {
//   res.send("response test");
// };
const type1Model = require("../models/type1");

exports.createTypes = async (req, res, next) => {
  try {
    const created = await type1Model.create(req.body);
    console.log(`created:${created}`);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }

  // res.status(201).send();
};

exports.getTypes = async (req, res, next) => {
  try {
    const allTypes = await type1Model.find({});
    res.status(200).json(allTypes);
  } catch (error) {
    next(error);
  }
  // res.status(200).send();
};

exports.getTypesById = async (req, res, next) => {
  const type = await type1Model.findById(req.params.typeId);
  try {
    if (type) {
      res.status(200).json(type);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateType = async (req, res, next) => {
  try {
    let updatedType = await type1Model.findByIdAndUpdate(
      req.params.typeId,
      req.body,
      {
        new: true,
      }
    );
    if (updatedType) {
      res.status(200).json(updatedType);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};
