const db = require("../db");

const getAllCategories = (req, res) => {

    db.query(
        "SELECT * FROM food_categories",
        (err, result) => {

            if (err) {
                console.log("Category fetch failed");
                console.log(err);

                return res.status(500).json({
                    success: false,
                    message: "Category fetch failed"
                });
            }

            res.json({
                success: true,
                message: "Categories fetched successfully",
                data: result
            });
        }
    );

};
// =========================
// ADD CATEGORY
// =========================
const getcreateCategory = (req,res) => {

};

module.exports = {
    getAllCategories
};