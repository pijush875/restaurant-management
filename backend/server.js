const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("."));

const foodCategoryRoutes = require("./routes/foodCategoryRoutes");
const foodItemRoutes = require("./routes/foodItem");

app.use("/api/food-categories", foodCategoryRoutes);
app.use("/api/food-items", foodItemRoutes);

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Restaurant API is running"
    });
});

app.listen(5000, () => {
    console.log("Restaurant API running on http://localhost:5000");
});