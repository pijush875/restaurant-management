const express = require("express");

const app = express();
app.use(express.json());
app.use(express.static("."));
const db = require("./db");
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Restaurant API is running"
    });
});
app.get ("/api/about",(req,res) => {
     res.json({
        success:true,
        message: "About success full"
     });   
});

app.post("/api/test",(req,res)=>{
     console.log(req.body)
    res.json({
        success:true,
        data:req.body
    });
});

app.post("/api/food",(req,res)=>{
    const { name, price } = req.body;
    db.query(
    'INSERT INTO foods (name, price) VALUES (?, ?)',
    [name, price],
    (err, result) => {

        if (err) {
            console.log('Insert failed');
            console.log(err);
             return res.status(500).json({
                    success: false,
                    message: "Food insert failed"
                });
        }

         res.json({
        success: true,
        message: "Food Insert successfully",
        id: result.insertId,
        data: {
                    name: name,
                    price: price
                }
    });

    }
);
});
app.put("/api/food/:id", (req, res) => {

    const id = req.params.id;
    const foodData = req.body;

    console.log("Food ID:", id);
    console.log("Food Data:", foodData);

    res.json({
        success: true,
        message: "Food updated successfully",
        id: id,
        data: foodData
    });

});
app.delete("/api/food/:id", (req, res) => {

    const id = req.params.id;   

    console.log("Food ID:", id);
    console.log("Food Data:", foodData);

    res.json({
        success: true,
        message: "Food Delete successfully",
        id: id,
        data: foodData
    });

});



app.listen(3000, () => {
    console.log("Restaurant API running on http://localhost:3000");
});