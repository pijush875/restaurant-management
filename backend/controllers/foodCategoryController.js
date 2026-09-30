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
    const {name, description, status} = req.body;
    // Validation
    if (!name || name.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Category name is required"
        });
    }
     const categoryName = name.trim();
    const categoryDescription = description
        ? description.trim()
        : null;

    const categoryStatus =
        status === undefined ? 1 : Number(status);
        const sql = `
    INSERT INTO food_categories
    (name, description, status)
    VALUES (?, ?, ?)
`;
          db.query(
        sql,
        [
            categoryName,
            categoryDescription,
            categoryStatus
        ],
        (err, result) => {
            if (err) {
                console.log("Category insert failed");
                console.log(err);

                return res.status(500).json({
                    success: false,
                    message: "Category insert failed"
                });
            }

            res.status(201).json({
                success: true,
                message: "Food category added successfully",
                data: {
                    id: result.insertId,
                    name: categoryName,
                    description: categoryDescription,
                    status: categoryStatus
                }
            });
        }
    );

};

module.exports = {
    getAllCategories,
    getcreateCategory
};