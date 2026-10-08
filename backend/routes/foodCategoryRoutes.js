const express = require("express");
const foodCategoryController = require("../controllers/foodCategoryController");

const router = express.Router();
//foodCategory
router.get("/", foodCategoryController.getAllCategories);
router.post("/",foodCategoryController.getcreateCategory);
router.get("/:id", foodCategoryController.getCategoryById);
router.put("/:id", foodCategoryController.updateCategory);
router.patch( "/:id/status", foodCategoryController.toggleCategoryStatus );
router.delete( "/:id", foodCategoryController.deleteCategory );

module.exports = router;