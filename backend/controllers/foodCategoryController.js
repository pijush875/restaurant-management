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

// =========================
// GET CATEGORY BY ID
// =========================
const getCategoryById = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT *
        FROM food_categories
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            console.log("Category fetch failed");
            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Category fetch failed"
            });
        }

        if (result.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Food category not found"
            });
        }

        return res.json({
            success: true,
            message: "Category fetched successfully",
            data: result[0]
        });
    });
};
// =========================
// UPDATE CATEGORY
// =========================
const updateCategory = (req, res) => {

    const { id } = req.params;

    const {
        name,description} = req.body;

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

    // =========================
    // CHECK CATEGORY EXISTS
    // =========================

    const checkSql = `
        SELECT id
        FROM food_categories
        WHERE id = ?
        LIMIT 1
    `;


    db.query( checkSql, [id], (err, rows) => {
            if (err) {

                console.log("Category check failed");
                console.log(err);

                return res.status(500).json({
                    success: false,
                    message: "Category check failed"
                });
            }

            // =========================
            // CATEGORY NOT FOUND
            // =========================

            if (rows.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Food category not found"
                });
            }


            // =========================
            // CHECK DUPLICATE NAME
            // =========================

            const duplicateSql = `
                SELECT id
                FROM food_categories
                WHERE LOWER(TRIM(name)) = LOWER(?)
                AND id != ?
                LIMIT 1
            `;


            db.query(
                duplicateSql,
                [categoryName, id],
                (err, duplicateRows) => {

                    if (err) {

                        console.log("Category duplicate check failed");
                        console.log(err);

                        return res.status(500).json({
                            success: false,
                            message: "Category duplicate check failed"
                        });
                    }


                    // =========================
                    // DUPLICATE FOUND
                    // =========================

                    if (duplicateRows.length > 0) {

                        return res.status(409).json({
                            success: false,
                            message: "Category already exists"
                        });
                    }


                    // =========================
                    // UPDATE CATEGORY
                    // =========================

                    const updateSql = `
                        UPDATE food_categories
                        SET
                            name = ?,
                            description = ?
                        WHERE id = ?
                    `;


                    db.query(
                        updateSql,
                        [
                            categoryName,
                            categoryDescription,
                            id
                        ],
                        (err, result) => {

                            if (err) {

                                console.log("Category update failed");
                                console.log(err);

                                return res.status(500).json({
                                    success: false,
                                    message: "Category update failed"
                                });
                            }


                            // =========================
                            // SUCCESS
                            // =========================

                            return res.json({
                                success: true,
                                message: "Food category updated successfully",
                                data: {
                                    id: Number(id),
                                    name: categoryName,
                                    description: categoryDescription
                                }
                            });

                        }
                    );

                }
            );

        }
    );
};
// =========================
// DELETE CATEGORY
// =========================

const deleteCategory = (req, res) => {

    const { id } = req.params;


    // =========================
    // CHECK CATEGORY EXISTS
    // =========================

    const checkSql = `
        SELECT id
        FROM food_categories
        WHERE id = ?
        LIMIT 1
    `;


    db.query(
        checkSql,
        [id],
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
            // CATEGORY NOT FOUND
            // =========================

            if (rows.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Food category not found"
                });
            }


            // =========================
            // DELETE CATEGORY
            // =========================

            const deleteSql = `
                DELETE FROM food_categories
                WHERE id = ?
            `;


            db.query(
                deleteSql,
                [id],
                (err, result) => {

                    if (err) {

                        console.log("Category delete failed");
                        console.log(err);

                        return res.status(500).json({
                            success: false,
                            message: "Category delete failed"
                        });
                    }


                    // =========================
                    // SUCCESS
                    // =========================

                    return res.json({

                        success: true,

                        message:
                            "Food category deleted successfully",

                        data: {
                            id: Number(id)
                        }

                    });

                }
            );

        }
    );

};

// =========================
// TOGGLE CATEGORY STATUS
// =========================

const toggleCategoryStatus = (req, res) => {

    const { id } = req.params;

    const { status } = req.body;


    // =========================
    // VALIDATION
    // =========================

    const categoryStatus = Number(status);

    if (![0, 1].includes(categoryStatus)) {

        return res.status(400).json({
            success: false,
            message: "Invalid category status"
        });

    }


    // =========================
    // CHECK CATEGORY EXISTS
    // =========================

    const checkSql = `
        SELECT id
        FROM food_categories
        WHERE id = ?
        LIMIT 1
    `;


    db.query(
        checkSql,
        [id],
        (err, rows) => {

            if (err) {

                console.log("Category check failed");
                console.log(err);

                return res.status(500).json({
                    success: false,
                    message: "Category check failed"
                });

            }


            if (rows.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Food category not found"
                });

            }


            // =========================
            // UPDATE STATUS
            // =========================

            const updateSql = `
                UPDATE food_categories
                SET status = ?
                WHERE id = ?
            `;


            db.query(
                updateSql,
                [categoryStatus, id],
                (err, result) => {

                    if (err) {

                        console.log("Category status update failed");
                        console.log(err);

                        return res.status(500).json({
                            success: false,
                            message: "Category status update failed"
                        });

                    }


                    // =========================
                    // SUCCESS
                    // =========================

                    return res.json({

                        success: true,

                        message:
                            categoryStatus === 1
                                ? "Food category activated successfully"
                                : "Food category deactivated successfully",

                        data: {
                            id: Number(id),
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
    getcreateCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
    toggleCategoryStatus
};