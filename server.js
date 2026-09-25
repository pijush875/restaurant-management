const express = require("express");

const app = express();
app.use(express.json());
app.use(express.static("."));

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

app.post("/api/food",(req,res)=>{
    console.log(req.body)
    res.json({
        success:true,
          message: "Food created successfully",
        data:req.body
    });
});

app.listen(3000, () => {
    console.log("Restaurant API running on http://localhost:3000");
});