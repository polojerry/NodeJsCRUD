require("dotenv").config();

const express = require('express')
const app = express();

app.get("/api", (req, res)=>{
    res.json({
        success: 1,
        message: "Api Working"

    });
});

app.listen(process.env.APP_PORT, ()=>{
    console.log("Server Running on port: ",process.env.APP_PORT )
});