const express = require("express");
const foodCategoryController = require("../controllers/foodCategoryController");

const router = express.Router();

router.get("/", foodCategoryController.getAllCategories);
router.post("/",foodCategoryController.getcreateCategory);

module.exports = router;