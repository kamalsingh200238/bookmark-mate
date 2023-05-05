import express from 'express';
import { Response, Request } from 'express';
import Bookmark from '../models/Bookmark';

const app = express();
app.use(express.json());

export const singleTest = async (req: Request, res: Response) => {
  res.send('test mvc structure');
  console.log("'/api/v1/bookmarks' This api is working fine.");
};

export const addBookmark = async (req: Request, res: Response) => {
  console.log('name', req.body.nameOfBookmark, 'url', req.body.urlOfBookmark);

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

export const deleteBookmark = async (req: Request, res: Response) => {
  try {
    //Issue a MongoDB findOneAndDelete() command by document's _id field
    //findOneAndDelete(id) is shorthand for findOneAndDelete({_id:id})
    const response = await Bookmark.findByIdAndDelete(req.params.id);
    if (response) {
      console.log('Bookmark deleted!')
      return res.status(200).json({ message: response})
    }
    console.log('There is no bookmark to delete!');
    res.status(404).json({ message: response });
  } catch (error) {
    console.log('There is an error!');
    res.status(500).json({ message: error });
  }
};

export const findBookmark = async (req: Request, res: Response) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);
    if (bookmark) {
      console.log('Bookmark exists!');
      return res.status(200).json({ message: bookmark });
    }
    console.log('Bookmark not found!');
    res.status(404).json({ message: bookmark });
  } catch (error) {
    console.log('There is an error!');
    res.status(500).json({ message: error });
  }
};
