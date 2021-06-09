`use strict`;
const express = require("express");
const router = express.Router();
const controllerType1 = require("./controller/type1");
router.get("/", controllerType1.getTypes);
router.post("/", controllerType1.createTypes);

module.exports = router;
