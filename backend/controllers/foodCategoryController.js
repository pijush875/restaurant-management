const db = require("../db");

// =========================
// GET ALL CATEGORIES
// =========================
const getAllCategories = (req, res) => {

    const sql = `
        SELECT *
        FROM food_categories
        ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.log("Category fetch failed");
            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Category fetch failed"
            });
        }

        return res.json({
            success: true,
            message: "Categories fetched successfully",
            data: result
        });
    });
};


// =========================
// ADD CATEGORY
// =========================
const getcreateCategory = (req, res) => {

    const {
        name,
        description,
        status
    } = req.body;


    // =========================
    // VALIDATION
    // =========================

    if (!name || typeof name !== "string" || name.trim() === "") {

        return res.status(400).json({
            success: false,
            message: "Category name is required"
        });
    }


    const categoryName = name.trim();


    const categoryDescription =
        typeof description === "string" && description.trim() !== ""
            ? description.trim()
            : null;


    const categoryStatus =
        status === undefined
            ? 1
            : Number(status);


    // =========================
    // STATUS VALIDATION
    // =========================

    if (![0, 1].includes(categoryStatus)) {

        return res.status(400).json({
            success: false,
            message: "Invalid category status"
        });
    }


    // =========================
    // CHECK DUPLICATE
    // =========================

    const checkSql = `
        SELECT id
        FROM food_categories
        WHERE LOWER(TRIM(name)) = LOWER(?)
        LIMIT 1
    `;


    db.query(
        checkSql,
        [categoryName],
        (err, rows) => {

            if (err) {

                console.log("Category check failed");
                console.log(err);

                return res.status(500).json({
                    success: false,
                    message: "Category check failed"
                });
            }


            // =========================
            // DUPLICATE FOUND
            // =========================

            if (rows.length > 0) {

                return res.status(409).json({
                    success: false,
                    message: "Category already exists"
                });
            }


            // =========================
            // INSERT CATEGORY
            // =========================

            const insertSql = `
                INSERT INTO food_categories
                (
                    name,
                    description,
                    status
                )
                VALUES (?, ?, ?)
            `;


            db.query(
                insertSql,
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


                    // =========================
                    // SUCCESS
                    // =========================

                    return res.status(201).json({
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

        }
    );
};


module.exports = {
    getAllCategories,
    getcreateCategory
};