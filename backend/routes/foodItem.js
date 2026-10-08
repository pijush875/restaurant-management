const express = require("express");
const foodItemController = require("../controllers/foodItemController");
const router = express.Router();

router.get("/",foodItemController.getAllItem)

module.exports = router;