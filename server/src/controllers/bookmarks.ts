import { Response, Request } from "express";
import Bookmark from "../models/Bookmark";

export const singleTest = async (req: Request, res: Response) => {
  res.send("test mvc structure");
  console.log("'/api/v1/bookmarks' This api is working fine.");
};

export const addBookmark = async (req: Request, res: Response) => {
  const { nameOfBookmark, urlOfBookmark } = req.body;

  try {
    const bookmark = await Bookmark.create({
      nameOfBookmark,
      urlOfBookmark,
    });
    await bookmark.save();
    console.log("Bookmark added!");
    res.json(200).json(bookmark);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error with posting bookmark" });
  }
};
