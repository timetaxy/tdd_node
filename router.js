`use strict`;
const express = require("express");
const router = express.Router();
const controllerType1 = require("./controller/type1");
router.post("/", controllerType1.createTypes);
router.get("/", controllerType1.getTypes);
router.get("/:typeId", controllerType1.getTypesById);
router.put("/:typeId", controllerType1.updateType);
router.delete("/:typeId", controllerType1.deleteType);

module.exports = router;
