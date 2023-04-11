const express = require("express");
const app = express();
// models
import Bookmark from './models/Bookmark' 


exports.getTest=async(req,res)=>{
    res.send('test mvc structure');
    console.log("test")

}

exports.addToBookmark = async (req,res) => {
    const { nameOfBookmark, urlOfBookmark } = req.body;
  
    try {
      const bookmark = Bookmark.create({
        nameOfBookmark,
        urlOfBookmark
      })
      await bookmark.save()
      console.log("Bookmark added!")
      res.json(200).json(bookmark)
  
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Error with posting bookmark" });

    }
  }


