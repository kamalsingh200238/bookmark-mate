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

//delete bookmark of a user
export const deleteBookmark = async (req: Request, res: Response) => {
  //finds a single document by its _id field
  const bookmark = await Bookmark.findById(req.params.id)
  if (!bookmark) {
    console.log("Bookmark doesn't exist!")
    //no results, no user error, expected response
    return res.status(200).json({ message: 'Bookmark not found!' })
  }
  try {
    //Issue a MongoDB findOneAndDelete() command by document's _id field
    //findOneAndDelete(id) is shorthand for findOneAndDelete({_id:id})
    let deletedResult = await Bookmark.findByIdAndDelete(req.params.id)
    console.log(`${deletedResult} removed!`)
    res.status(200).json({ message: 'Bookmark deleted!'})
  } catch(error) {
    console.log(error)
    res.status(500).json({message: 'Error with removing bookmark'})
  }
}

//find bookmark by id
export const findBookmark = async (req: Request, res: Response) => {
  try {
    let bookmark = await Bookmark.findById(req.params.id)
    if (!bookmark) {
      console.log("Bookmark doesn't exist!")
      //no results, no user error, expected response
      return res.status(200).json({ message: 'Bookmark does not exist!' })
    }
    console.log(`Bookmark found! ${bookmark}`)
    res.status(200).json({ message: 'Bookmark found!'})
  } catch(error) {
    console.log(error)
    res.status(500).json({ message: 'Error finding bookmark!' })
  }
}

