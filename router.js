`use strict`;
const express = require("express");
const router = express.Router();
const controllerType1 = require("./controller/type1");
router.get("/", controllerType1.createProduct);
router.post("/", controllerType1.createProduct);

module.exports = router;
