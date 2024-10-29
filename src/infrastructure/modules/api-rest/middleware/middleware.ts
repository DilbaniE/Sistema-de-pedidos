import express from "express";

const middleware404 = express();

middleware404.use((req, res, next) =>{
    console.log("middleware");
    res.status(404)
    .send("Not found")
})

export default middleware404;