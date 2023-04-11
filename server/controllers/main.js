const express = require("express");
const app = express();

exports.getTest=async(req,res)=>{
    res.send('test mvc structure');
    console.log("test")

}


