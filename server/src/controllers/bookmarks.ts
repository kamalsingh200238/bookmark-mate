import express from 'express'
import { Response, Request } from 'express';
import Bookmark from '../models/Bookmark';


const app = express();
app.use(express.json());

export const singleTest = async (req: Request, res: Response) => {
  res.send('test mvc structure');
  console.log("'/api/v1/bookmarks' This api is working fine.");
};

export const addBookmark = async (req: Request, res: Response) => {
  console.log(req)
  console.log("name", req.body.nameOfBookmark, "url", req.body.urlOfBookmark)

  try {
    const bookmark = await Bookmark.create({
      nameOfBookmark: req.body.nameOfBookmark,
      urlOfBookmark: req.body.urlOfBookmark,
    });
    await bookmark.save();
    console.log('Bookmark added!');
    res.status(200).json(bookmark);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error with posting bookmark' });
  }
};
