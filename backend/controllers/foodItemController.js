const db = require("../db");
// =========================
// GET ALL Item
// =========================

const getAllItem = (req, res) => {
    const sql = `SELECT * FROM food_items ORDER BY id DESC`;
    db.query(sql,(err,result)=>{
        if(err){
            console.log("Item featch failed");
            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Item fetch failed"
            });
        }

        return res.json({
            success: true,
            message: "Item fetched successfully",
            data: result
        });
    });
}
module.exports = {
    getAllItem
};